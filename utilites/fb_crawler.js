let startUrls = {
    // "Sadcasm": "https://www.facebook.com/Sadcasm/photos/a.458106047914642.1073741828.458104154581498/918639761861266/?type=3&theater"
   "Laugh": "https//www.facebook.com/laughingcolours/photos/a.10150471189319578.388832.173770089577/10157632423039578/?type=3&theater"
};

let images=[];

const isDuplicate = (img) =>{
    return images.length > 0 && images[images.length - 1][0] === img && img !== null;
};

const fetch = () => {
    try{
        let t = document.getElementsByClassName("fbPhotosPhotoCaption")[0].innerText;
        let img = document.getElementsByClassName("spotlight")[0].src;
        if (!isDuplicate(img))
            images.push([img, t]);
        else
            console.log("duplicate");
        document.getElementsByClassName("snowliftPager next hilightPager")[0].click()
    }catch (e){
        console.log("error");
    }
};

setInterval(function(){
    if(images.length > 500){
        console.log("Reached image threshold. clear images data");
    }else{
        fetch();
        console.log("fetched "+ images.length);
    }
}, 1000);  //


/**
 * open the url from above  starturls.
 *	open inspect element from chrome  , go to console, clear the console. 
 copy paste the above code from let images  and if images will stop sliding then  hover over the image
 it will fetch till 500 
  start bash terminal , go to nodeapp directory and start source ~/.bashrc && node
  once it displays  a msg - reached image threshold,   then type JSON.stringify(images) 
  then click on copy  and paste the content in sadcasm.js in new line.
  copy the url of sadcasm and replace it by previous url.
  Restart the browser
  

 * */