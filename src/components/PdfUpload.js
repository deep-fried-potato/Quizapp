import React from 'react'
import axios from 'axios'


class PdfUpload extends React.Component{

handleUploadFile = (event)=>{
  var token = localStorage.getItem('auth-token')
  var config={
    headers:{'x-access-token':token}
  };
  console.log(event.target.files[0])
  const data = new FormData()
  data.append('document',event.target.files[0])
  axios.post("http://10.0.36.104:8000/quiz/pdfupload",data,{}).then(res=>{
    res.data.coursecid = this.props.match.params.courseid
    axios.post("http://10.0.36.104:8000/quiz/createquiz",res.data,config).then(res=>{
      console.log("Quiz Created")
    })
  })
}

render(){
  return(
    <div>
      <h1>PDF File Upload</h1>
       <input type="file" onChange={this.handleUploadFile} />
     </div>

  )
}


}

export default PdfUpload
