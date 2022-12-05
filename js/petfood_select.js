// import { petfood_list } from "/Users/leeseokjune/Desktop/louishome_front/web/js/petfood_data"

var louis_url = 'http://52.79.233.120:8000/';
var petfood_list = [];
var selected_petfood = [];
var selected_petfood_name = [];
var pet = {'pet':'0'}
window.onload = function(){
    
    if (pet['pet']=='0'){
        petfood_list = dog_petfood_list;
    }else{
        petfood_list = cat_petfood_list;
    }
    get_petfood();

}
function show_petfood_data(){
    var inner_text = '';
    petfood_sort();


    for(var index=0; index<petfood_list.length; index++){
        inner_text += "<button class='select_button' onclick='select_petfood("+JSON.stringify(petfood_list[index])+")'>"
        inner_text += "<div class='select_form'>";
        inner_text += "<div class='select_img'><img src='../images/"+petfood_list[index]['brand']+"/"+petfood_list[index]['name']+".png'></div>"
        inner_text += "<div class='product_name'>" + petfood_list[index]['name']+"</div>";
        inner_text += '</div></button>';
    }
    show_petfood.innerHTML = inner_text;
    show_selected_petfood();

}

function show_selected_petfood(){
    var inner_text = '';
    if(selected_petfood.length == 0){
        show_selected_petfood_form.innerHTML = "<div class='empty_text'>루이가 먹을 수 있는 사료를 아래에서 찾아 클릭해주세요</div>";
    }
    else{
        for (var index=0; index<selected_petfood.length; index++){
            inner_text += "<button class='delete_button' onclick='delete_selected_petfood("+JSON.stringify(selected_petfood[index])+")'>"
            inner_text += "<div class='delete_form'>";
            inner_text += "<div class='delete_img'><img src='../images/"+selected_petfood[index]['brand']+"/"+selected_petfood[index]['name']+".png'></div>"
            inner_text += "<div class='product_name'>" + selected_petfood[index]['name'] + "</div>";
            inner_text += "<span class='remove_button'>-</span>"
            inner_text += '</div></button>';
        }
        show_selected_petfood_form.innerHTML = inner_text;
    }
}

function select_petfood(data){
    selected_petfood.push(data);
    selected_petfood_name.push(data['name']);
    delete_petfood_list(data);
    show_petfood_data();
    console.log(selected_petfood_name)
}

function delete_selected_petfood(data){
    var i;
    for(var index=0; index<petfood_list.length;index++){
        if(petfood_list[index]['name'] == data['name']){
            i=index; break;
        }
    }
    selected_petfood.splice(i, 1);
    selected_petfood_name.splice(i,1);
    petfood_list.push(data);
    show_petfood_data();
}

function delete_petfood_list(data){
    var i;
    for(var index=0; index<petfood_list.length;index++){
        if(petfood_list[index]['name'] == data['name']){
            i=index; 
            break;
        }
    }
    petfood_list.splice(index,1);
}

function petfood_sort(){
    petfood_list = petfood_list.sort(function(a,b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if(x<y){
            return -1;
        }
        if(x>y){
            return 1;
        }
        return 0;
    });
}

function set_petfood(){
    fetch(louis_url+"set-petfood/",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({'member_id': 'jjhy95','name':'꾸꾸까까','petfood':selected_petfood_name}),
    }).then((response)=> response.json()).then((json_data) =>{
        console.log(json_data)
    })
}

function get_petfood(){
    fetch(louis_url+'get-petfood/',{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({'member_id':'jjhy95','name':'꾸꾸까까'},)
    }).then((response)=> response.json()).then((json_data)=>{

        selected_petfood_name = str_to_list(json_data['petfood']);
        console.log(selected_petfood_name)
        for(var index=0; index < selected_petfood_name.length; index++){
            for(var jndex=0; jndex < petfood_list.length;jndex++){
                if (selected_petfood_name[index] == petfood_list[jndex]['name']){
                    console.log(selected_petfood_name[index])
                    selected_petfood.push(petfood_list[jndex]);
                    petfood_list.splice(jndex,1);
                }
            } 
        }
        show_petfood_data();
    })
}

function str_to_list(str_data){
    if(typeof(str_data) == "string"){
        str_data = str_data.slice(1,str_data.length-1).replaceAll("'","").split(", ")
    }
    for(var index=0; index < str_data.length; index++){
        if(str_data[index] == ''){
            str_data.splice(index,1);
            index--;
        }
        str_data[index] = str_data[index].slice(0, str_data[index].length)
    }
    return str_data
}






var dog_petfood_list = [{'pet': '강아지', 'name': '[오리젠] 퍼피', 'brand': '오리젠', 'show_product': 'O'}, {'pet': '강아지', 'name': '[오리젠] 6fish', 'brand': '오리젠', 'show_product': 'O'}, {'pet': '강아지', 'name': '[오리젠] 오리지날 독', 'brand': '오리젠', 'show_product': 'O'}, {'pet': '강아지', 'name': '[오리젠] 스몰브리드', 'brand': '오리젠', 'show_product': 'O'}, {'pet': '강아지', 'name': '[오리젠] 시니어 독', 'brand': '오리젠', 'show_product': 'O'}, {'pet': '강아지', 'name': '[오리젠] 피트&트림', 'brand': '오리젠', 'show_product': 'O'}, {'pet': '강아지', 'name': '[아카나] 싱글즈 프리런 덕', 'brand': '아카나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[아카나] 싱글즈 요크셔 포크', 'brand': '아카나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[아카나] 퍼피 스몰브리드', 'brand': '아카나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[시그널케어] 사랑하개', 'brand': '시그널케어', 'show_product': 'O'}, {'pet': '강아지', 'name': '[웰니스] 심플 스몰브리드 살몬&포테이토', 'brand': '웰니스', 'show_product': 'O'}, {'pet': '강아지', 'name': '[웰니스] 컴플리트헬스 스몰브리드 헬시웨이트', 'brand': '웰니스', 'show_product': 'O'}, {'pet': '강아지', 'name': '[웰니스] 컴플리트헬스 그레인프리 스몰브리드', 'brand': '웰니스', 'show_product': 'O'}, {'pet': '강아지', 'name': '[웰니스] 컴플리트헬스 스몰브리드 시니어', 'brand': '웰니스', 'show_product': 'O'}, {'pet': '강아지', 'name': '[토우] 구운오리&고구마 독', 'brand': '테이스트오브더와일드', 'show_product': 'O'}, {'pet': '강아지', 'name': '[토우] 훈제연어&고구마 독', 'brand': '테이스트오브더와일드', 'show_product': 'O'}, {'pet': '강아지', 'name': '[인스팅트] RBK 헬시웨이트 독', 'brand': '인스팅트', 'show_product': 'O'}, {'pet': '강아지', 'name': '[인스팅트]  RBK 시니어', 'brand': '인스팅트', 'show_product': 'O'}, {'pet': '강아지', 'name': '[인스팅트]  RBK 오리고기', 'brand': '인스팅트', 'show_product': 'O'}, {'pet': '강아지', 'name': '[인스팅트]  RBK 치킨 독', 'brand': '인스팅트', 'show_product': 'O'}, {'pet': '강아지', 'name': '[인스팅트] 얼티밋 프로틴 독', 'brand': '인스팅트', 'show_product': 'O'}, {'pet': '강아지', 'name': '[인스팅트] BE 내추럴 독', 'brand': '인스팅트', 'show_product': 'O'}, {'pet': '강아지', 'name': '[인스팅트] BE 내추럴 연어', 'brand': '인스팅트', 'show_product': 'O'}, {'pet': '강아지', 'name': '[인스팅트] 오리지날 토끼고기', 'brand': '인스팅트', 'show_product': 'O'}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 올브리드 어덜트 피쉬', 'brand': '나우', 'show_product': 'O'}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 올브리드 어덜트', 'brand': '나우', 'show_product': 'O'}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 스몰브리드 어덜트 피쉬', 'brand': '나우', 'show_product': 'O'}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 스몰브리드 시니어', 'brand': '나우', 'show_product': 'O'}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 스몰브리드 어덜트', 'brand': '나우', 'show_product': 'O'}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 스몰브리드 퍼피', 'brand': '나우', 'show_product': 'O'}, {'pet': '강아지', 'name': '[GO!] LID 오리 레시피', 'brand': 'GO!', 'show_product': 'O'}, {'pet': '강아지', 'name': '[GO!] LID 칠면조 레시피', 'brand': 'GO!', 'show_product': 'O'}, {'pet': '강아지', 'name': '[GO!] LID 연어 레시피', 'brand': 'GO!', 'show_product': 'O'}, {'pet': '강아지', 'name': '[GO!] LID 연어 레시피 스몰브리드', 'brand': 'GO!', 'show_product': 'O'}, {'pet': '강아지', 'name': '[워프] 에어드라이드 베니슨(사슴고기)', 'brand': '워프', 'show_product': 'O'}, {'pet': '강아지', 'name': '[워프] 에어드라이드 비프(소고기)', 'brand': '워프', 'show_product': 'O'}, {'pet': '강아지', 'name': '[워프] 동결건조 와일드고트(야생염소)', 'brand': '워프', 'show_product': 'O'}, {'pet': '강아지', 'name': '[지위픽] 에어드라이 트라이프&양고기', 'brand': '지위픽', 'show_product': 'O'}, {'pet': '강아지', 'name': '[지위픽] 에어드라이 닭고기 독', 'brand': '지위픽', 'show_product': 'O'}, {'pet': '강아지', 'name': '[지위픽] 에어드라이 양고기 독', 'brand': '지위픽', 'show_product': 'O'}, {'pet': '강아지', 'name': '[지위픽] 에어드라이 소고기 독', 'brand': '지위픽', 'show_product': 'O'}, {'pet': '강아지', 'name': '[지위픽] 에어드라이 사슴고기 독', 'brand': '지위픽', 'show_product': 'O'}, {'pet': '강아지', 'name': '[파미나] N&D 독 그레인프리 청어&오렌지 미니', 'brand': '파미나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[파미나] N&D 독 그레인프리 펌프킨 닭고기&석류 미니', 'brand': '파미나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[파미나] N&D 독 그레인프리 펌프킨 멧돼지&사과 미니', 'brand': '파미나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[파미나] N&D 독 그레인프리 펌프킨 대구&오렌지 미니', 'brand': '파미나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[파미나] N&D 독 로우그레인 닭고기&석류 미니', 'brand': '파미나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[디바크] 센스 터키 앤 살몬 퍼피', 'brand': '디바크', 'show_product': 'O'}, {'pet': '강아지', 'name': '[디바크] 센스 살몬 어덜트', 'brand': '디바크', 'show_product': 'O'}, {'pet': '강아지', 'name': '[워프] 동결건조 램(양고기)', 'brand': '워프', 'show_product': 'O'}, {'pet': '강아지', 'name': '[워프] 동결건조 비프(소고기)', 'brand': '워프', 'show_product': 'O'}, {'pet': '강아지', 'name': '[워프] 동결건조 와일드베니슨(야생사슴)', 'brand': '워프', 'show_product': 'O'}, {'pet': '강아지', 'name': '[디바크] 센스 덕 앤 터키 시니어', 'brand': '디바크', 'show_product': 'O'}, {'pet': '강아지', 'name': '[토우] 훈제연어&고구마 퍼피', 'brand': '테이스트오브더와일드', 'show_product': 'O'}, {'pet': '강아지', 'name': '[맥아담스] 방목치킨 시니어&라이트', 'brand': '맥아담스', 'show_product': 'O'}, {'pet': '강아지', 'name': '[맥아담스] 방목치킨 소형견용', 'brand': '맥아담스', 'show_product': 'O'}, {'pet': '강아지', 'name': '[맥아담스] 방목치킨 중형견용', 'brand': '맥아담스', 'show_product': 'O'}, {'pet': '강아지', 'name': '[맥아담스] 방목치킨&연어 소형견용', 'brand': '맥아담스', 'show_product': 'O'}, {'pet': '강아지', 'name': '[맥아담스] 방목치킨&연어 중형견용', 'brand': '맥아담스', 'show_product': 'O'}, {'pet': '강아지', 'name': '[퓨리나] 프로플랜 슈레드 강아지', 'brand': '퓨리나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[퓨리나] 프로플랜 슈레드 소형견', 'brand': '퓨리나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[퓨리나] 프로플랜 슈레드 노령견', 'brand': '퓨리나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[퓨리나] 프로플랜 토이 퍼피', 'brand': '퓨리나', 'show_product': 'O'}, {'pet': '강아지', 'name': '[허즈] 독 칠면조가슴살 레시피', 'brand': '허즈', 'show_product': 'O'}, {'pet': '강아지', 'name': '[허즈] 독 닭가슴살 레시피', 'brand': '허즈', 'show_product': 'O'}, {'pet': '강아지', 'name': '[카일리] 소프트프레쉬 그레인프리 터키 미니', 'brand': '카일리', 'show_product': 'O'}, {'pet': '강아지', 'name': '[카일리] 소프트프레쉬 그레인프리 치킨 미니', 'brand': '카일리', 'show_product': 'O'}]
var cat_petfood_list = [{'pet': '고양이', 'name': '[아카나] 와일드 프레이리 캣', 'brand': '아카나', 'show_product': 'O'}, {'pet': '고양이', 'name': '[아카나] 그래스랜드 캣', 'brand': '아카나', 'show_product': 'O'}, {'pet': '고양이', 'name': '[아카나] 패시피카 캣', 'brand': '아카나', 'show_product': 'O'}, {'pet': '고양이', 'name': '[오리젠] 캣&키튼', 'brand': '오리젠', 'show_product': 'O'}, {'pet': '고양이', 'name': '[오리젠] 6피쉬 캣', 'brand': '오리젠', 'show_product': 'O'}, {'pet': '고양이', 'name': '[오리젠] 피트&트림 캣', 'brand': '오리젠', 'show_product': 'O'}, {'pet': '고양이', 'name': '[파미나] N&D CAT 로우그레인(귀리) 닭고기&석류', 'brand': '파미나', 'show_product': 'O'}, {'pet': '고양이', 'name': '[파미나] N&D CAT 오션 로우 엔세스트럴 그레인대구&오렌지', 'brand': '파미나', 'show_product': 'O'}, {'pet': '고양이', 'name': '[파미나] N&D CAT 그레인프리 닭고기&석류', 'brand': '파미나', 'show_product': 'O'}, {'pet': '고양이', 'name': '[파미나] N&D CAT 그레인프리 멧돼지&사과', 'brand': '파미나', 'show_product': 'O'}, {'pet': '고양이', 'name': '[파미나] N&D CAT 오션 그레인프리 청어&오렌지', 'brand': '파미나', 'show_product': 'O'}, {'pet': '고양이', 'name': '[파미나] N&D CAT 퀴노아 유리너리 오리', 'brand': '파미나', 'show_product': 'O'}]
