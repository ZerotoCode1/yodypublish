import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Row from "react-bootstrap/Row";
function VnpayScreen() {
    const [vnorrder,setvnorder]=useState()
    const [banking,setbanking]=useState()
    const { state } = useContext(Store);
    const { userInfo } = state;
    const params = useParams();
  const { id: orderId } = params; 
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`https://apiwenandapp.onrender.com/api/orders/${orderId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setvnorder(data)
        console.log(data);
      } catch (err) {
      }
    };
    fetchOrder()
  },[])
         const handlerclick=()=>{
            console.log(vnorrder.totalPrice
                );
            try {
                const fetchData = async ()=>{
                    const data = await axios.post('https://apiwenandapp.onrender.com/api/orders/create_payment_url',
                     {
                        vnorrder:vnorrder,
                        bank:banking
                     }
                    )
                   window.location.href=data.data
                }
                fetchData()
              
            } catch (error) {
                
            }
         }
  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Đảm bảo nút nằm giữa màn hình dọc
    }}>
        <div
            style={{
                width: "200px", // Điều chỉnh chiều rộng của nút theo nhu cầu của bạn
                border: "1px solid #ccc", // Đây chỉ là ví dụ để thấy rõ kích thước của nút
                padding: "10px",
                textAlign: "center",
                cursor: "pointer",
            }}
            onClick={handlerclick}
        >
            Click để chuyển sang thanh toán
        </div>
       
        <Form.Group  className="mb-3" controlId="rating">
        <Row>
        <Form.Label>Chọn ngân hàng thanh toán</Form.Label>
        <Form.Select
          aria-label="Rating"
          required
          value={"fsd"}
           onChange={(e) => setbanking(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="NCB">NCB</option>
          <option value="VISA">VISA</option>
          <option value="MasterCard">MasterCard</option>
          <option value="JCB">JCB</option>
        </Form.Select>
        </Row>
        
      </Form.Group>
    </div>
  )
}

export default VnpayScreen