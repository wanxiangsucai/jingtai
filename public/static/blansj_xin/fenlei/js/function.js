function imageReader(file,viewDom){
  if(file){
    let fileReader=new FileReader();
    let view=jQuery(viewDom)[0];
    fileReader.onloadend=()=>{
      view.src=fileReader.result;
    }
    fileReader.readAsDataURL(file);
  }  
}