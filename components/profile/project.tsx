import {
  myProjectIdeafetch,
  myProjectCollecfetch,
} from "@/lib/Fetch/projectFetch";
import { useUserId } from "@/lib/context/Usercontext";
import React, { useEffect, useState } from "react";
import { ProjectDetails } from "@/lib/interface/Project";
import Projectlayout from "./projectlayout";
import STATES from "@/lib/utils/constants";

const Project_details = () => {
  const { uid } = useUserId();
  let [isError, setisError] = useState<boolean>(false);
  let [Ideano, setIdeano] = useState<number | null>();
  let [collecno, setcollecno] = useState<number | null>(5);
  let [ideaTrigger, setideaTrigger] = useState<boolean>(true);
  let [myIdeaData, setmyIdeaData] = useState<ProjectDetails[] | null>(null);
  let [myCollecData, setmyCollecData] = useState<ProjectDetails[] | null>(null);
  const [loading,setloading] = useState(STATES.LOADED)
  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        setloading(STATES.LOADING)
        let responseIdeaData: any = await myProjectIdeafetch(uid);
        let responseCollecData: any = await myProjectCollecfetch(uid);
        if (
          responseIdeaData?.error == null &&
          responseCollecData?.error == null
        ) {
          let ActualIdeaData = responseIdeaData?.data;
          let ActualCollecData = responseCollecData?.data;
          setmyIdeaData(ActualIdeaData);
          setmyCollecData(ActualCollecData);
          setIdeano(ActualIdeaData?.length);
          setcollecno(ActualCollecData?.length);
        } else {
          setisError(true);
        }
      }
      setloading(STATES.LOADED)
    };
    fetchData();
  }, [uid]);

  if (isError) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Currently an Error is occured, Please Try after some time.
      </div>
    );
  } else {
    if(loading === STATES.LOADED){

      return (
        <div className="flex flex-col h-full p-3 mr-4">
        <div className="flex m-10 space-x-16">
          <div
            className={
              ideaTrigger
              ? `text-primary border-primary border-b-2 cursor-pointer`
                : "cursor-pointer"
            }
            onClick={() => setideaTrigger(true)}
            >
            {"Ideas" + "(" + Ideano + ")"}
          </div>
          <div
            className={
              ideaTrigger
                ? "cursor-pointer"
                : `text-primary border-primary border-b-2 cursor-pointer`
              }
              onClick={() => setideaTrigger(false)}
              >
            {"Collections" + "(" + collecno + ")"}
          </div>
        </div>
        <Projectlayout Idea={ideaTrigger} IdeaData={myIdeaData} CollectionData={myCollecData}/>
      </div>
    );
  }
  else if (loading === STATES.LOADING){
    return(
      <div>Loading</div>
    )
  }
}
};

export default Project_details;
