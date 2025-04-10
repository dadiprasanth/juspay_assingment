import React, { useState } from "react";
import CatSprite from "./CatSprite";
import Sprite from "./Sprite";
export default function PreviewArea(props) {
  const[flag,setFlag]=useState(false);
  const check=()=>{
    //we need to write code here before they hit each other we need to predit whether they hit or not
    // let obj={}
    // let pos={}
    // props.items.forEach(x=>{
    //   if(obj[x.target]){
    //     obj[x.target]=obj[x.target].push(x)

    //   }else{
    //     obj[x.target]=[x]
    //   }
    // })
    
    setFlag(true)
    setTimeout(()=>{
      setFlag(false)
    },1000)
  }
  return (<>
  <button
  className={`px-2 py-1 ${ 'bg-green-300'}`}
   onClick={()=>check()} style={{position:"absolute",bottom:20,cursor:"pointer",zIndex:1500}}>play</button>
    <div className="flex-none h-full overflow-y-auto p-2" style={{position:"relative",width:"100%"}}>
      <CatSprite flag={flag} data={props.items.filter(x=>x.target=="cat")} />
      {props.count.map((x,index)=>{
        return <Sprite flag={flag} key={index} data={props.items.filter(x=>x.target==("sprite"+index))} />
      })}
     
    </div>
    </>
  );
}
