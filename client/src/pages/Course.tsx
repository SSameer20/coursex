import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import { Routes } from "../layout/types";
import { validateJWT } from "../layout/Validate.JWT";
import { Button } from "@nextui-org/react";
import API from "../apiConfig";

export default function Course() {
  const navigate = useNavigate();
  const [course, setCourse] = useState<any[]>([]);

  useEffect(() => {
    try {
      let token = localStorage.getItem("token");
      const isValid = validateJWT(token);
      if (!isValid) {
        localStorage.removeItem("token");
        return navigate(Routes.AUTH);
      }

      axios
        .get(API.USER_MY_COURSE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setCourse(response.data.data);
        })
        .catch((err) => {
          swal("No Data", err.response.data.message, "warning");
        });
    } catch (error) {
      swal("Error", "Error while fetching data", "error");
    }
  }, []);
  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-10">
      <span className="text-3xl underline">My Courses</span>
      <div className="w-[100%] flex flex-row gap-10 mt-10">
        {course.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[200px] h-[100px] flex flex-col justify-center items-start gap-5 hover:scale-[1.01]"
            >
              <img src={item.courseId.imageUrl} alt={item.courseId.title} />
              <h1>{item.courseId.title}</h1>
              <div className="flex flex-row gap-10">
                <Button color="primary">View Course</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
