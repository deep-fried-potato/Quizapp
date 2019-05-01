import React from "react";
import axios from "axios";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
class PdfUpload extends React.Component {
  state = {
    files: [
      {
        source: "index.html",
        options: {
          type: "local"
        }
      }
    ]
  };
  handleUploadFile = event => {
    var token = localStorage.getItem("auth-token");
    var config = {
      headers: { "x-access-token": token }
    };
    console.log(event.target.files[0]);
    const data = new FormData();
    data.append("document", event.target.files[0]);
    axios.post("http://10.0.36.104:8000/quiz/pdfupload", data, {}).then(res => {
      res.data.coursecid = this.props.match.params.courseid;
      axios
        .post("http://10.0.36.104:8000/quiz/createquiz", res.data, config)
        .then(res => {
          console.log("Quiz Created");
        });
    });
  };

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#e0e0e0",
          position: "absolute",
          top: 0,
          width: "102%",
          minHeight: "100%",
          marginLeft: "-20px"
        }}
      >
        <Typography
          component="h2"
          variant="display2"
          gutterBottom
          style={{
            paddingTop: "8%",
            paddingBottom: "3%"
          }}
        >
          PDF File Upload
        </Typography>
        <Typography
          component="h2"
          variant="display1"
          gutterBottom
          style={{
            paddingBottom: "3%",
            fontSize: "20px",
            fontWeight: "normal"
          }}
        >
        Upload a pdf file to automatically generate a quiz!
        </Typography>
        <Button variant="contained" color="primary" component="label" style={{
          backgroundColor: '#212121',
          color: '#fff'
        }}>
          Upload File
          <input
            type="file"
            onChange={this.handleUploadFile}
            style={{ display: "none" }}
          />
        </Button>
        {/* <input type="file"  /> */}
      </div>
    );
  }
}

export default PdfUpload;
