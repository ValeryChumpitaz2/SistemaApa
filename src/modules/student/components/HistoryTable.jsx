import {
 FileText
} from "lucide-react";


export default function HistoryTable(){


const history=[];


return (

<div className="
bg-white
rounded-2xl
shadow
p-8
">


{
history.length===0

?

<div className="
text-center
py-8
">


<FileText
className="
mx-auto
text-gray-400
"
size={45}
/>


<h3 className="
text-xl
font-bold
mt-4
">

Aún no tienes revisiones

</h3>


<p className="
text-gray-500
mt-2
">

Cuando analices un documento aparecerá aquí.

</p>


</div>


:

null

}



</div>

);


}