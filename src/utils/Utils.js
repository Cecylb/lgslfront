import {useDispatch, useSelector} from "react-redux";
import {Button} from "reactstrap";
import React from "react";

export async function fetchElements() {
     return await fetch('api/editor')
         .then(response => response.json())
         .then(data => {
             return data
         });
 }