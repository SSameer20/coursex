import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import { Course, Routes } from "../../layout/types";
import { validateJWT } from "../../layout/Validate.JWT";
import { Button } from "@nextui-org/react";
import API from "../../apiConfig";

export default function AdminCourse() {
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let token = localStorage.getItem("Admin token");
        const isValid = validateJWT(token);
        if (!isValid) {
          localStorage.removeItem("token");
          return navigate(Routes.AUTH);
        }

        const response = await axios.get(API.ADMIN_COURSE_VIEW, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourse(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        if (err) {
          swal("No Data", "Error", "warning");
        } else {
          swal("Error", "Error while fetching data", "error");
        }
      }
    };

    fetchCourses();
  }, [navigate]);

  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-10">
      <span className="text-3xl underline">My Courses</span>
      <div className="w-[100%] flex flex-row gap-10 mt-10">
        {course.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[200px] h-[300px] flex flex-col justify-center items-start gap-5 hover:scale-[1.01] z-10"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-[150px] object-cover"
              />
              <h1 className="text-lg font-bold">{item.title}</h1>
              <Button color="primary">View Course</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
