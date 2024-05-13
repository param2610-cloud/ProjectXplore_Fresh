import { ProjectDetails } from "@/lib/interface/Project";
import { CircleArrowUp, Heart, LucideEye, MessageCircle } from "lucide-react";
import React from "react";

interface ProjectlayoutProps {
  Idea: boolean;
  IdeaData: ProjectDetails[] | null;
  CollectionData: ProjectDetails[] | null;
}

const Projectlayout: React.FC<ProjectlayoutProps> = ({
  Idea,
  IdeaData,
  CollectionData,
}) => {
  if (Idea && IdeaData) {
    return (
      <div className="flex-grow grid grid-cols-5 gap-4">
        <div className="col-span-2 bg-[#c0c4fa] w-full h-[250px] border-blue-400 border-4 border-dashed  flex flex-col justify-center items-center">
          <div>
            <CircleArrowUp size={90} />
          </div>
          <p className="text-md">Upload Your Idea</p>
        </div>
        {IdeaData.map((element: ProjectDetails, index) => {
          let picture = JSON.parse(element.image_url);
          if (index % 2 == 0) {
            return (
              <div key={index} className=" col-span-3  w-full h-[250px]">
                <div>
                  <img
                    src={picture[0]}
                    alt=""
                    className="bg-cover h-[230px] w-full rounded-md"
                  />
                  <p className="text-xl font-bold pl-2 pt-1">
                    {element.Project_name}
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="col-span-2 w-full h-[250px]">
                <div>
                  <img
                    src={picture[0]}
                    alt=""
                    className="bg-cover h-[230px] w-full rounded-md"
                  />
                  <p className="text-xl font-bold pl-2 pt-1">
                    {element.Project_name}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  } else if (Idea == false && CollectionData) {
    return (
      <div className="flex-grow grid grid-cols-3 gap-4">
        {CollectionData.map((element: ProjectDetails, index: number) => {
          const image = JSON.parse(element.image_url);
          return (
            <div
              className={`w-full h-full bg-cover bg-center flex justify-center items-center space-x-9`}
              style={{ backgroundImage: `url(${image[0]})` }}
            >
              <div className="flex">
                <Heart className="bg-transparent" size={30} />{" "}
                <div>{element.likes}</div>
              </div>
              <div className="flex">
                <LucideEye className="bg-transparent" size={30} />{" "}
                <div>{element.views}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }else{
    <div className="flex justify-center items-center">
        Project banale mere bhai...
    </div>
  }
};

export default Projectlayout;
