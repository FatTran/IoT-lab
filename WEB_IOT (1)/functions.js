// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, child, get, onValue,update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRYUwnLUY-OkNHQLvwJkE1xcFGYWXtWNU",
  authDomain: "iot-lab-eee2c.firebaseapp.com",
  databaseURL: "https://iot-lab-eee2c-default-rtdb.firebaseio.com",
  projectId: "iot-lab-eee2c",
  storageBucket: "iot-lab-eee2c.appspot.com",
  messagingSenderId: "121697789691",
  appId: "1:121697789691:web:3d5bd3a863961f395d725e",
  measurementId: "G-H82RDPB4GH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbref = ref(db);

var temp = document.getElementById('tempValue');
var attend = document.getElementById('attendValue');
var netspeed = document.getElementById('networkValue');
var light = document.getElementById('lightValue'); 
var ac = document.getElementById('ACValue'); 
var alarm = document.getElementById('alarmValue'); 
//Initialize variables
var img1 = document.querySelector('#light1');
var img2 = document.querySelector('#ml1');
var img3 = document.querySelector('#ring1');

var img_id_list = [ '#light1', '#ml1', '#ring1',
                    '#light2', "#ml2", '#ring2',
                    '#light3', "#ml3", '#ring3',
                    '#light4', "#ml4", '#ring4',]
var img = []

for(let i = 0; i < 12; i++){
    img[i] = document.querySelector(img_id_list[i]);
}

var hashmap = {}

var device_id_list = [  '#light1_on', '#light1_off', '#ac1_on', '#ac1_off', '#alarm1_on', '#alarm1_off',
                        '#light2_on', '#light2_off', '#ac2_on', '#ac2_off', '#alarm2_on', '#alarm2_off',
                        '#light3_on', '#light3_off', '#ac3_on', '#ac3_off', '#alarm3_on', '#alarm3_off',
                        '#light4_on', '#light4_off', '#ac4_on', '#ac4_off', '#alarm4_on', '#alarm4_off'];
var buttonList = [];


for(var i = 0; i < device_id_list.length; i++){
    buttonList[i] = document.querySelector(device_id_list[i]);
}
var roomList = ["Room J1601", "Room J1602", "Room J1603", "Room J1604"];
for(let i = 0 ; i < 4; i++){
    hashmap[roomList[i]] = [img[3 * i], img[3 * i + 1], img[3 * i + 2]];
}
for(let i = 0 ; i < 4; i++){
    if(buttonList[i * 6])     buttonList[i * 6].addEventListener('click', function(){updateLightOn(roomList[i])});
    if(buttonList[i * 6 + 1]) buttonList[i * 6 + 1].addEventListener('click', function(){updateLightOff(roomList[i])});
    if(buttonList[i * 6 + 2]) buttonList[i * 6 + 2].addEventListener('click', function(){updateACOn(roomList[i])});
    if(buttonList[i * 6 + 3]) buttonList[i * 6 + 3].addEventListener('click', function(){updateACOff(roomList[i])});
    if(buttonList[i * 6 + 4]) buttonList[i * 6 + 4].addEventListener('click', function(){updateAlarmOn(roomList[i])});
    if(buttonList[i * 6 + 5]) buttonList[i * 6 + 5].addEventListener('click', function(){updateAlarmOff(roomList[i])});
}

function readData(room){
    get(child(dbref, room)).then((snapshot) => {
        temp.innerText = snapshot.val()["Temperature"];
        attend.innerText = snapshot.val()["Attendance"];
        netspeed.innerText = snapshot.val()["Network_Speed"];
    })
}
function updateLightOn(room){
    hashmap[room][0].src = "densang.png";
    update(ref(db, room),{ 
        Light: 1,
    }); 
}
function updateLightOff(room){
    hashmap[room][0].src = "light.png";
    update(ref(db, room),{
        Light: 0,
    });
}
function updateACOn(room){
    hashmap[room][1].src = "maylanh-on.jpg";
    update(ref(db, room),{ 
        Air_Conditioner: 1,
    });
}
function updateACOff(room){
    hashmap[room][1].src = "maylanh.png";
    update(ref(db, room),{
        Air_Conditioner: 0,
    });
}
function updateAlarmOn(room){
    hashmap[room][2].src = "Alarm-on-1.jpg";
    update(ref(db, room),{ 
        Bell: 1,
    });
}
function updateAlarmOff(room){
    hashmap[room][2].src = "Chuong.png";
    update(ref(db, room),{
        Bell: 0,
    });
}
function getRoomData(room){  
    readData(room);
}


document.getElementById("J1601").addEventListener('click', function() {getRoomData("Room J1601")});
document.getElementById("J1602").addEventListener('click', function() {getRoomData("Room J1602")});
document.getElementById("J1603").addEventListener('click', function() {getRoomData("Room J1603")});
document.getElementById("J1604").addEventListener('click', function() {getRoomData("Room J1604")});
