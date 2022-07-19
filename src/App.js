import React,{useState,useEffect} from 'react'
import axios from 'axios';
import{
MDBTable,
MDBTableHead , 
MDBTableBody, 
MDBRow,MDBCol , 
MDBContainer,
MDBBtn,
MDBBtnGroup
} from "mdb-react-ui-kit";
import './App.css';




function App() {
  const [data,setData] = useState([]);
  const [value,setvalue] = useState("");
  const [sortValue, setSortValue] =useState("");

  const sortOption = ["score" , "title"];
  

  

  useEffect(() => {
    loadUserData();
    
  }, []);


  const loadUserData = async () =>{
      return await axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json")
      .then((response) => setData(response.data))
      .catch((err) =>console.log(err)); 
  }
  console.log("data",data);


  const handleReset = () =>{

    loadUserData();
  };
  const handleSearch = async(e) => {
    e.preventDefault();
    return await axios
    .get(`https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json?q=${value}`)
    .then((response)=>{setData(response.data);
      setvalue("");
    })
    .catch((err) => console.log(err));
  };
  
  const handleSort = async(e) => {
   let value = e.target.value;
   setSortValue(value);
    return await axios
    .get(`https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json?_sort=${value}&_order=asc`)
    .then((response)=>{setData(response.data);
    })
    .catch((err) => console.log(err));
  };

  const handleFilter = async(e) => {
    return await axios
    .get(`https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json?status=${value}`)
    .then((response)=>{setData(response.data);
    })
    .catch((err) => console.log(err));
  };

  return (
  <MDBContainer>
    <form style = {{
      margin: "auto",
      padding: "15px",
      maxWidth: "400px",
      alignContent: "center",
    }}
    className="d-flex input-group w-auto"
    onSubmit={handleSearch}
    >
    <input 
    tye="text"
    className="form-control"
    placeholder="Search Name..."
    value={value}
    onChange = {(e)=>setvalue(e.target.value)}
    />
    
      <MDBBtn type="submit" color="dark">Search</MDBBtn>
      <MDBBtn className="mx-2" color="info" onClick={() => handleReset}>
        Reset</MDBBtn>
    
    </form>
    <div style = {{marginTop: "100px"}}>
      <h2 className="text-center">
      Search, Filter,Sort and Pagination using JSON Rest API</h2>
      <MDBRow>
        <MDBCol size="100">
          <MDBTable>
            <MDBTableHead color="dark">
              <tr>
                <th scope='col'>No.</th>
                <th scope='col'>Title</th>
                <th scope='col'>Platform</th>
                <th scope='col'>Score</th>
                <th scope='col'>Genre</th>
                <th scope='col'>editors_choice</th>
              </tr>

            </MDBTableHead>
            {data.length === 0 ?  (
              <MDBTableBody className="align-center mb-0">
              <tr>
                <td colspan ={8} className="text-center mb-0">No Data Found</td>
              </tr>
              </MDBTableBody>
            ): (
              data.map((item ,index) => (
                <MDBTableBody key = {index}>
                  <tr>
                    <th scopre = "row">{index+1}</th>
                    <td>{item.title}</td>
                    <td>{item.platform}</td>
                    <td>{item.score}</td>
                    <td>{item.genre}</td>
                    <td>{item.editors_choice}</td>
                  </tr>

                </MDBTableBody>
              ))
            )}

          </MDBTable>
        </MDBCol>
      </MDBRow>
    </div>
<MDBRow>
  <MDBCol size="8"> </MDBCol>
  <h5> sort by:</h5>
  <select style = {{width: "50%",borderRadius: "2px",height:" 35px"}}
    onChange = {handleSort}
    value = {sortValue}
    >
      <option>Please Select Value</option>
      {sortOption.map((item,index)=>(
        <option value={item} key ={index}>{item}</option>
      ))}
  </select>
  <MDBCol size="4"><h2>Filter By Score:</h2></MDBCol>
  <MDBBtnGroup>
  <MDBBtn color="success" onClick={()=> handleFilter("Active")}>
    Active
    </MDBBtn>
  <MDBBtn
   color="danger"
    style = {{marginLeft: "2px"}}
    onClick={()=> handleFilter("InActive")}>
      Inactive
      </MDBBtn>
    </MDBBtnGroup>     
</MDBRow>

  </MDBContainer>
  );
}

export default App;
