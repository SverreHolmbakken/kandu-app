import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

export default function Task() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Task title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Task description</p>
      </CardContent>
    </Card>
  );
}
