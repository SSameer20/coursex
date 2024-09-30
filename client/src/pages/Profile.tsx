import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import swal from "sweetalert";
import { CircularProgress } from "@nextui-org/react";

// // import API from "../apiConfig";

// import { Routes, User } from "../layout/types";
// import { validateJWT } from "../layout/Validate.JWT";
// import API from "../apiConfig";

export default function Profile() {
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(true);
  const [loadValue, setLoadValue] = useState<number>(0);
  //   // const [user, setUser] = useState<User>({
  //   //   email: "",
  //   // });

  //   useEffect(() => {
  //     try {
  //       setLoadValue(10);
  //       const token = localStorage.getItem("token");
  //       const isValid = validateJWT(token);
  //       if (!isValid) {
  //         return navigate(Routes.AUTH);
  //       }
  //       setLoadValue(50);

  //       axios
  //         .get(API.USER_DETAILS, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((response) => {
  //           let data = response.data.data;
  //           let userDetails: User = {
  //             email: data.email,
  //             firstName: data.firstName,
  //             lastName: data.lastName,
  //             _id: data._id,
  //           };
  //           setUser({ ...userDetails });
  //           setLoadValue(100);
  //           setTimeout(() => {
  //             setLoad(false);
  //           }, 1000);
  //         })
  //         .catch((error) => {
  //           swal("Error", error.response.data, "warning");
  //         });
  //     } catch (error) {
  //       swal("Error", "error", "warning");
  //     }
  //   }, []);
  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-10">
      <span className="text-3xl underline">Profile</span>
      {load ? (
        <div className="w-[100%] h-[100%] flex justify-center items-center">
          <CircularProgress
            aria-label="Loading..."
            size="lg"
            value={loadValue}
            color="warning"
            showValueLabel={true}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-5 ">
          <h1>Sameer</h1>
        </div>
      )}
    </div>
  );
}
