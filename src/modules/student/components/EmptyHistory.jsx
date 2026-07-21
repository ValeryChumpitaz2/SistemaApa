import {
  History
} from "lucide-react";


export default function EmptyHistory(){


return (

<div className="
bg-white
rounded-2xl
border
p-10
text-center
text-gray-400
">


<History

size={45}

className="
mx-auto
mb-4
"

/>


<h3 className="
text-xl
font-bold
text-gray-600
">

Sin historial

</h3>


<p className="mt-2">

Aún no tienes documentos revisados.

</p>


</div>

);


}