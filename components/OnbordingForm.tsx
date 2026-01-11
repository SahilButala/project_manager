"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Textarea } from "./ui/textarea";
import { countryList } from "@/app/utils/CountryList";
import { industryTypesList, rolelist } from "@/app/utils";
import { userSchema } from "@/lib/schema";
import { toast } from "sonner";
import { createUser } from "@/app/(protected)/actions/user";

// type of props
interface Props {
  name: string;
  email: string;
  image: string;
}

// type of user data
export type UserDataType = z.infer<typeof userSchema>;

const OnbordingForm = ({ name, email, image }: Props) => {
  const [pending, setpending] = useState(false);

  // initialize form
  const form = useForm<UserDataType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      about: "",
      name: name || "",
      email: email || "",
      industryType: "",
      country: "",
      role: "",
      image: image || "",
    },
  });

  console.log(name, "name");

  // onsubmit handler
  const onSubmit = async (data: UserDataType) => {
     try {

      console.log(data , 'data')
      setpending(true)
      await createUser(data)
     } catch (error) {
        console.log(error)
        toast.error("Something went wrong please try again..")
     }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
      <Card className="min-w-[380px]">
        <CardHeader>
          <CardTitle>Welcome Back {`${name}`}</CardTitle>
          <CardDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
            repudiandae repellat, obcaecati neque a ab consectetur sequi autem
            hic totam?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              action=""
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* country  */}

              <FormField
                control={form.control}
                name="country"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {countryList.map((data) => (
                          <SelectItem key={data?.code} value={data?.name}>
                            <div className="flex flex-row items-center">
                              <img
                                src={data?.flag}
                                className="w-4 h-3"
                                alt={data?.name}
                              />

                              <p className="pl-2">{data?.name}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* select area section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* industry type */}
              <FormField
                control={form.control}
                name="industryType"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {industryTypesList.map((data) => (
                          <SelectItem key={data} value={data}>
                            <div className="flex flex-row items-center">
                         

                             {data}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="role"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {rolelist?.map((data) => (
                          <SelectItem key={data} value={data}>
                            <div className="flex flex-row items-center">
                         

                             {data}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              </div>

              {/* about section */}

                    <FormField
                control={form.control}
                name="about"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                        <FormControl>
                            <Textarea
                            {...field}
                            placeholder="Tell us about yourself"
                            className="resize-none"
                            
                            />
                        </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <Button className="w-full" type="submit" disabled={pending}>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnbordingForm;