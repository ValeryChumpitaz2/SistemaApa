import {
FileSearch
} from "lucide-react";


export default function EmptyState(){


return (

<div className="
border-2
border-dashed
rounded-3xl
p-10
text-center
text-gray-400
">


<FileSearch

size={50}

className="
mx-auto
mb-4
"

/>


<h3 className="
text-xl
font-bold
">

Sin análisis todavía

</h3>


<p>

Ingresa un documento de Google Docs para iniciar la revisión.

</p>


</div>

)

}