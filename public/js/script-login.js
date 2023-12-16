document.getElementById("btnLogin").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const URI = "https://back-proyecto-1er50-electiva-ii.vercel.app/login/";
  const dataSend = {
    username: username,
    password: password
  };
  fetch(URI, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(dataSend)
  })
    .then((response) => response.json())
    .then((data) => {
        if(data.state){
            console.log(data);
            window.location.replace("/dashboard/home");
            SaveLocalStorage("login",data.token)
        }else{
            alert(data.error)
        }
    })
    .catch(err=>{
        alert(err)})
});


const SaveLocalStorage =(key,item)=>{
    //conseguir elementos en localStorage
    let elementos = JSON.parse(localStorage.getItem(key))
    //comprar si es un array
    if(Array.isArray(elementos)){
      elementos.push(item);
    }else{
      //crear array
      elementos = item;
    }
    //guardar en el localStorage
    localStorage.setItem(key, JSON.stringify([elementos]))
    //devolver objeto
    return item;
  }
