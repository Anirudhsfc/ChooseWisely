import React from "react";
import axios from "axios";
import { Table, Spin, Select, TreeSelect } from "antd";
import hkuCourses2019 from "../hkuCourses2019";
const { Option } = Select;
const { TreeNode } = TreeSelect;

const GOOGLE_FORM_COURSE_ID = "entry.1960058332";
const GOOGLE_FORM_RATING_ID = "entry.1281033610";
const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/u/1/d/e/1FAIpQLSc0MT9Nfy9bDFw3s4kUNWXkAlo3Z5fnvWKFJSYaQfGU52B4YQ/formResponse";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

export const Review = () => {
  const [reviewed, changeReviewed] = React.useState([]);
  const [selectedDepartment, changeSelectedDepartment] = React.useState("");
  const [course, changeCourse] = React.useState("");
  const [rating, changeRating] = React.useState(3);
  const [error, changeError] = React.useState("");
  const [loading, changeLoading] = React.useState(false);

  const handleSubmit = event => {
    changeLoading(true);
    event.preventDefault();
    changeError("");
    const formData = new FormData();
    formData.append(GOOGLE_FORM_COURSE_ID, course);
    formData.append(GOOGLE_FORM_RATING_ID, rating);
    axios
      .post(CORS_PROXY + GOOGLE_FORM_ACTION_URL, formData)
      .then(() => {
        changeReviewed([...reviewed, { course, rating }]);
        changeCourse("");
        changeRating(3);
        changeLoading(false);
      })
      .catch(() => {
        changeError(error);
        changeLoading(false);
      });
  };

  return (
    <div>
      <Table
        columns={[
          {
            title: "Course",
            dataIndex: "course",
            key: "course"
          },
          {
            title: "Rating",
            dataIndex: "rating",
            key: "rating"
          }
        ]}
        dataSource={reviewed}
      />
      {error && <div>Error: {error}</div>}
      {loading && (
        <Spin
          size="large"
          style={{ display: "flex", justifyContent: "center", margin: 5 }}
        />
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Select
          showSearch
          style={{ width: 300, margin: 5 }}
          placeholder="Select a department"
          optionFilterProp="children"
          onChange={value => changeSelectedDepartment(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {Object.keys(hkuCourses2019).map(department => (
            <Option value={department}>{department}</Option>
          ))}
        </Select>
        {selectedDepartment && (
          <Select
            showSearch
            style={{ width: 500, margin: 5 }}
            placeholder="Select a course"
            optionFilterProp="children"
            onChange={value => changeCourse(value)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {hkuCourses2019[selectedDepartment].map(({ code, title }) => (
              <Option value={`${code} ${title}`}>{`${code} ${title}`}</Option>
            ))}
          </Select>
        )}
        <input
          name="rating"
          type="number"
          value={rating}
          min="1"
          max="5"
          onChange={e => changeRating(e.target.value)}
          style={{ margin: 5 }}
        />
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};
