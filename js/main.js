var siteName=document.getElementById('site-Name');
var siteUrl=document.getElementById('site-Url');
var btnSubmit=document.getElementById('submit');
var siteArr=[];
if(localStorage.Bookmark !=null){
    siteArr=JSON.parse(localStorage.Bookmark)
}else{
    siteArr=[]
}
function createTable(){
    var expressionName=/^[A-Z][0-9]?[a-z]{3,}/;
    var regexName=new RegExp(expressionName);
    var expressionUrl=/^https:\/\/[w]{3}\.[A-Za-z0-9]{3,}\.com$/
    var regexUrl=new RegExp(expressionUrl);
    var siteDetail={
        name:siteName.value,
        url:siteUrl.value,
    }
    if(siteName.value.match(regexName) && siteUrl.value.match(regexUrl)){
        siteArr.push(siteDetail);
        localStorage.setItem('Bookmark',JSON.stringify(siteArr))
        showData();
        clearInput();
    }else if(!siteName.value.match(regexName)){
        swal("name not valid", "please Begin capital letter", "error");
    }else {
        if(siteUrl.value==''){
            swal("Url not valid", "please enter url", "error");
        }else if(!siteUrl.value.match(regexUrl)){
            swal("Url not valid", "please Begin https:// and end .com ", "error");
        }
    }
}
showData();
function showData(){
    var tableBody=document.getElementById('table_body');
    var container=''
    for(var i=0;i<siteArr.length;i++){
        container+=`
        <tr>
            <td>${i+1}</td>
            <td>${siteArr[i].name}</td>
            <td><button class="btn btn-success "><a href="${siteArr[i].url}"class="text-decoration-none text-white" target="_blank"></><i class="fa-solid fa-eye me-1"></i> Visit</a></button></td>
            <td><button class="btn btn-danger" onclick="deleteData(${i})"><i class="fa-solid fa-trash-can me-1"></i> Delete</button></td>
        </tr>
        `
        tableBody.innerHTML=container;
    }
}
function deleteData(e){
    var tableBody=document.getElementById('table_body');
    if(tableBody.children.length == 1){
        siteArr.splice(0,1);
        location.reload();
    }
    siteArr.splice(e,1);
    localStorage.Bookmark=JSON.stringify(siteArr);
    showData();
}
function clearInput(){
    siteName.value='';
    siteUrl.value='';
}