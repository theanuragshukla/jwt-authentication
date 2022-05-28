const signupBtn = document.getElementById("signup")
const btn1 = document.getElementById("btnLeft")
const btn2 = document.getElementById("btnRight")
const error = document.getElementById("error")

async function signup(){
	const fname  = document.getElementById('fname')
	const lname  = document.getElementById('lname')
	const email = document.getElementById('email')
	const user = document.getElementById('user')
	const pass = document.getElementById('pass')

	const data = {
		fname:fname.value,
		lname:lname.value,
		email:email.value,
		pass:pass.value,
		user:user.value
	}
	if(await checkAll(data)){
		fetch('/add-new-user', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( {
				fname:fname.value,
				lname:lname.value,
				email:email.value,
				pass:pass.value,
				"user":user.value
			})
		})
			.then(res=>res.json())
			.then(res=>{
				if(res.status){
					alert('account created successfully! please login')
				}else{
					if(res.email){
						alert(res.result)
					}else if(res.user){
						alert(res.result)
					}
				}
			}
			)
	}
	else {
		alert("error")
	}

	
}
const arr = [1,2,3]
var pos = 1
const inpDiv1 = document.getElementById("inpDiv1");
const inpDiv2 = document.getElementById("inpDiv2");
const inpDiv3 = document.getElementById("inpDiv3");
inpDiv3.style.display="none"
inpDiv2.style.display="none"
function slideInp(dir){
	if(dir==-1){
		pos=(pos==1)?pos:pos-1
	}else if(dir==1){
		pos=(pos==3)?pos:pos+1
	}
	signupBtn.style.display=pos==3 ? "initial" : "none";
	btn1.style.display=pos==1 ? "none" : "initial";
	btn2.style.display=pos==3 ? "none" : "initial";
	arr.forEach((idx)=>{
		if(idx==pos){
			window[`inpDiv${idx}`].style.display="flex"
		}else{
			window[`inpDiv${idx}`].style.display="none"
		}
	})
}
window.onload=()=>{
	const verify =async ()=>{
		await fetch('/checkAuth', {
			method: 'GET',
			crossdomain: true,
			withCredentials:'include'
		})
			.then(res => res.json())
			.then(res =>manageAuth(res))
	}
	const manageAuth=(val)=>{
		if(val.result){
			location.href='/dashboard'
		}
	}
	verify()

}


