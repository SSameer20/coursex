// import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { CircularProgress } from "@nextui-org/react";

// // import API from "../apiConfig";

import { Routes, User } from "../../layout/types";
import { validateJWT } from "../../layout/Validate.JWT";
import API from "../../apiConfig";
import { Card, CardBody, Input, Button } from "@nextui-org/react";

interface ListCardProps {
  title: string;
  content?: string;
}

const ListCard = (props: ListCardProps) => {
  return (
    <Card>
      <CardBody>
        <span>{props.title}</span>
        <p>{props.content}</p>
      </CardBody>
    </Card>
  );
};

const ListCardInput = (props: ListCardProps) => {
  return (
    <Card className="w-1/3">
      <Input type="text" label={props.title} />
    </Card>
  );
};

export default function Profile() {
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(true);
  const [loadValue, setLoadValue] = useState<number>(0);
  const [user, setUser] = useState<User>({
    email: "",
  });
  useEffect(() => {
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
      axios
        .get(API.USER_DETAILS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          let data = response.data.data;
          setUser(data);
          setTimeout(() => {
            setLoad(false);
          }, 1000);
          // console.log(user);
        });
    } catch (error) {}
  }, []);

  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-10">
      {load ? (
        <CircularProgress />
      ) : (
        <>
          <span className="text-3xl underline">Profile</span>
          <div className="w-1/3 flex flex-col gap-5">
            <ListCard title="First Name" content={user.firstName} />
            <ListCard title="Last Name" content={user.lastName} />
            <ListCard title="Email" content={user.email} />
            <Button color="danger">Edit</Button>
          </div>
        </>
      )}
    </div>
  );
}
