// console.log(1);

// setTimeout(()=>console.log(2), 5000);   // 딜레이함수 (5초 뒤 실행)

// console.log(3);

// let news = [];

// const getLatestNews = async ()=>{
//     const url = new URL(
//         `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
//         ); 
//     console.log("uuu", url);

//     const response = await fetch(url);    // url 호출 함수 : fetch
//     const data = await response.json();
//     news = data.articles;

//     console.log("rrr", response);
//     console.log("news", news)
// }

// getLatestNews();



// ERROR HANDLING !! try-catch
let weight = 29;

try{
    // 이 안에서 에러가 발생하면 catch로 넘어감
    if(weight<30){
        throw new Error("당신은 너무 말랐어.")  // 에러를 강제로 발생시키기.
    }
}
catch(error){
    // catch가 에러를 잡아준다.
    console.log("내가 잡은 에러는, ", error.message)
}