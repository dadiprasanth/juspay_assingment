import React, { useState } from "react";
import Icon from "./Icon";
import { useDraggable } from "@dnd-kit/core";

function DraggableItem({ id, children, motion, value, target }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      content: children,
      key: motion,
      value: value,
      target: target
    },
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
    >
      {children}
    </div>
  );
}

export default function Sidebar({selectedSprite,setSelectedSprite,count, setCount,setItems,setreset}) {
  const [moves, setMoves] = useState(10);
  const [fangle, setFangle] = useState(15);
  const [bangle, setBangle] = useState(-15);
  const [edit, setEdit] = useState(false);
  const [sayText, setSayText] = useState("Hello!");
  const [sayDuration, setSayDuration] = useState(2);
  const [thinkText, setThinkText] = useState("Hmm...");
  const [thinkDuration, setThinkDuration] = useState(2);
const reseFun=()=>{
  setCount([])
  setSelectedSprite('cat')
  setItems([])
  setreset((reset)=>!reset)
  
}
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>

      <button
      className={`px-2 py-1 ${ 'bg-blue-500' }`}
       onClick={reseFun}>Reset</button>

      <div className="font-bold"> {"Sprite Selection"} </div>
      <div className="flex space-x-2 mb-2">
      <button 
          className={`px-2 py-1 ${selectedSprite === 'cat' ? 'bg-blue-500' : 'bg-gray-300'}`}
          onClick={() => setSelectedSprite('cat')}
        >
          Cat
        </button>
        {count.map((x,index)=>{
          return <button 
            key={index}
            className={`px-2 py-1 ${selectedSprite === "sprite"+index ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => setSelectedSprite("sprite"+index)}
          >

            {`Sp ${index}`}
          </button>
        })}
        <button 
          className={`px-2 py-1 ${ 'bg-gray-300'}`}
          onClick={() =>{setCount((count)=>[...count,{id:count.length}]);setSelectedSprite("sprite"+(count.length))}}
        >
          Add+
        </button>

      </div>

      <div className="font-bold"> {"Motion"} </div>
      <button
      className={`px-2 py-1 ${'bg-green-500'}`}
       onClick={() => setEdit(!edit)}>{edit ? "Save" : "Edit"}</button>
      {edit && <input type="number" value={moves} onChange={(e) => setMoves(e.target.value)} />}
      <DraggableItem 
        id="move-10-steps" 
        motion="move"
        value={moves}
        target={selectedSprite}
      >
        {`Move ${moves} steps`}
      </DraggableItem>
      {edit && <input type="number" value={fangle} onChange={(e) => setFangle(e.target.value)} />}
      <DraggableItem 
        id="turn-left-15" 
        motion="turn"
        value={fangle}
        target={selectedSprite}
      >
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {`${fangle} degrees`}
      </DraggableItem>
      {edit && <input type="number" value={bangle} onChange={(e) => setBangle(e.target.value)} />}
      <DraggableItem 
        id="turn-right-15" 
        motion="turn"
        value={bangle}
        target={selectedSprite}
      >
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {`${bangle} degrees`}
      </DraggableItem>

      <div className="font-bold mt-4"> {"Looks"} </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            value={sayText} 
            onChange={(e) => setSayText(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            placeholder="Text to say"
          />
          <input 
            type="number" 
            value={sayDuration} 
            onChange={(e) => setSayDuration(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-16"
            placeholder="Seconds"
          />
        </div>
        <DraggableItem 
          id="say-text" 
          motion="say"
          value={[sayText, sayDuration]}
          target={selectedSprite}
        >
          {`Say "${sayText}" for ${sayDuration} seconds`}
        </DraggableItem>

        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            value={thinkText} 
            onChange={(e) => setThinkText(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            placeholder="Text to think"
          />
          <input 
            type="number" 
            value={thinkDuration} 
            onChange={(e) => setThinkDuration(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-16"
            placeholder="Seconds"
          />
        </div>
        <DraggableItem 
          id="think-text" 
          motion="think"
          value={[thinkText, thinkDuration]}
          target={selectedSprite}
        >
          {`Think "${thinkText}" for ${thinkDuration} seconds`}
        </DraggableItem>
      </div>
    </div>
  );
}
