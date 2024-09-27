import { Input } from "@nextui-org/react";
import { useState } from "react";

// import

export default function Profile() {
  const [name, setName] = useState<string>("Sameer");
  return (
    <div>
      <Input
        type="email"
        label="Email"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
