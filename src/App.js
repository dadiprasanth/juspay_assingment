import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DndContext } from "@dnd-kit/core";

export default function App() {
  const [items, setItems] = useState([]);
  const[count,setCount]=useState([])
  const[styles,setStyles]=useState({
    top:0,
    left:0,
    angle:0
  })
  const[sstyles,setsStyles]=useState({
    top:0,
    left:0,
    angle:90
  })

  function handleDragEnd(event) {
    const { active, over } = event;
    
    if (over && over.id === "droppable") {
      console.log(active)
      setItems((items) => [...items, { 
        id: `${active.id}-${Date.now()}`, 
        content: active.data.current.content ,
        key:active.data.current.key,
        value:active.data.current.value,
        target:active.data.current.target
      }]);
    }
  }
  const moving=()=>{
    items.filter(x=>x.target=="cat").forEach((x, index)=>{
      setTimeout(()=>{
        if(x.key=="move"){
        
          
          // Update position
          setStyles((styles)=>{
            return{angle:styles.angle,
              top:styles.top+Math.sin(styles.angle * (Math.PI / 180)) * x.value,
              left:styles.left+Math.cos(styles.angle * (Math.PI / 180)) * x.value
            }
          })
        }else if(x.key=="turn"){
          setStyles((styles)=>{return{...styles,angle:styles.angle+(+x.value)}})
        }else if(x.key=="goto"){
          setStyles((styles)=>{return{...styles,top:+x.value[1],left:+x.value[0]}})
        }else{
          //repeat
          setTimeout(()=>{
            moving()
          },1000 )
        }
      },1000 * (index + 1)) // Add delay multiplier based on index
    })
    items.filter(x=>x.target!="cat").forEach((x, index)=>{
      setTimeout(()=>{
        if(x.key=="move"){
        
          
          // Update position
          setsStyles((styles)=>{
            return{angle:styles.angle,
              top:styles.top+Math.sin(styles.angle * (Math.PI / 180)) * x.value,
              left:styles.left+Math.cos(styles.angle * (Math.PI / 180)) * x.value}
          })
        }else if(x.key=="turn"){
          setsStyles((styles)=>{return{...styles,angle:styles.angle+(+x.value)}})
        }
      },1000 * (index + 1)) // Add delay multiplier based on index
    })
  }
  const [selectedSprite, setSelectedSprite] = useState('cat');
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="h-screen overflow-hidden flex flex-row">
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar selectedSprite={selectedSprite} setSelectedSprite={setSelectedSprite} setCount={setCount} count={count} />
            <MidArea items={items} type={selectedSprite} />
          </div>
          <div className="w-1/2 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea items={items} styles={styles} sstyles={sstyles} count={count}/>
            
          </div>
        </div>
      </DndContext>
    </div>
  );
}
