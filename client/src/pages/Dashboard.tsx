import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import { Course, Routes, DEVELOPMENT_API as API } from "../layout/types";
import { validateJWT } from "../layout/Validate.JWT";
import { Button } from "@nextui-org/react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let token = localStorage.getItem("token");

        // Ensure token is valid
        if (!token || !validateJWT(token)) {
          localStorage.removeItem("token");
          swal(
            "Session Expired",
            "You are Session Expired, Please Login Again",
            "warning"
          );
          return navigate(Routes.AUTH);
        }
        const response = await axios.get(API.USER_COURSE_ALL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(response.data.data);
      } catch (err) {
        if (err) {
          swal("No Data", "Error", "warning");
        } else {
          swal("Error", "Error while fetching data", "error");
        }
      }
    };
    fetchCourses();
  }, [navigate, validateJWT, Routes.AUTH, API.USER_COURSE_ALL]);

  const handleCoursePurchase = async (item: any) => {
    try {
      let token = localStorage.getItem("token");
      const isValid = validateJWT(token);
      if (!isValid) {
        localStorage.removeItem("token");
        return navigate(Routes.AUTH);
      }

      axios
        .post(
          API.USER_PURCHASE_COURSE,
          {
            courseId: item._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          swal("Purchase Successful", response.data.message, "success");
        })
        .catch((err) => {
          swal("Already Purchased", err.response.data.message, "warning");
        });
    } catch (error) {
      swal("Error", "error");
    }
  };

  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-10">
      <span className="text-3xl underline">Dashboard</span>
      <span className="text-xl">Available Courses</span>
      <div className="w-[100%] flex flex-row gap-10 mt-10">
        {course.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[200px] h-[100px] flex flex-col justify-center items-start gap-5 hover:scale-[1.01]"
            >
              <img src={item.imageUrl} alt={item.title} />
              <h1>{item.title}</h1>
              <div className="flex flex-row gap-10">
                <h2>{item.price}</h2>
                <Button
                  color="primary"
                  onClick={() => handleCoursePurchase(item)}
                >
                  Buy
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
