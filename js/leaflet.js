var pet={'member_id':'jjhy95','name':'꾸꾸까까'};
var louis_url = 'http://52.79.233.120:8000/';
var petfood_index = [0,1,2,3];
var qr_text = ['diet', 'joint', 'kidney', 'pancreas', 'recovery', 'skin'];
var qr_text_kor = ['다이어트', '관절케어', '신장케어', '췌장케어', '기력 회복', '피부/피모케어'];
var qr_index = [1,0];
window.onload = function(){
    document.querySelector('.main_title').addEventListener('click',show_input_dialog);
    // petfood_dialog(0);
}

function show_input_dialog(){
    document.getElementById("input_dialog").showModal();
}

function petfood_dialog(number){
    var inner_text = '';
    var dialog = document.querySelector('.petfood_dialog');
    for(var index=0;index<petfood_list.length; index++){
        inner_text += "<div class='petfood_form' onclick='set_petfood_index("+number+","+index+")'>"
        inner_text += "<img src='../images/" +petfood_list[index]['brand']+"/"+ petfood_list[index]['name']+".png'>"
        inner_text += petfood_list[index]['name']
        inner_text += "</div>"
    }
    dialog.innerHTML = inner_text;
    dialog.showModal();
}

function set_petfood_index(number,index){
    var dialog = document.querySelector('.petfood_dialog');
    petfood_index[number] = index;
    var petfood = petfood_list[petfood_index[number]];
    var hash = '';
    var detail_explain='';
    console.log(petfood)
    dialog.close();
    document.querySelector("#img_"+number +" > img").src = "../images/"+petfood['brand']+'/'+petfood['name']+".png";
    
    for(var index=0; index<petfood['hash'].length;index++){
        hash += '#'+petfood['hash'][index]+'<br>'
    }
    document.querySelector('#hash_tag_'+number).innerHTML = hash
    if(number==0){
        document.querySelector('.main_info > #age').textContent = petfood['life_stage'].join(', ')
        document.querySelector('.main_info > #protein').textContent = str_to_list(petfood['main_ingredient']).join(', ')

        detail_explain+='<ul>'
        for(var index=0; index<3;index++){
            detail_explain += '<li>' + petfood['detail_explain'][index]+'</li>';
        }
        detail_explain+='</ul>'
        document.querySelector('.sub_info').innerHTML = detail_explain;
    }


    // TODO: 0일땐 연령, 주 단백질, 상세설명까지 추가로 
}

function close_dialog(){
    fetch(louis_url+"single-pet/",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(pet),
    }).then((response)=> response.json()).then((json_data) =>{
        console.log(json_data);
        pet=json_data;
        pet['alg'] = str_to_list(pet['alg'])
        pet['alg_sub'] = str_to_list(pet['alg_sub'])
        pet['health'] = str_to_list(pet['health'])
        set_pet_info();
    })
    document.getElementById('input_dialog').close();
}

function set_pet_info(){
    var pet_info = pet['birth_year'] + '년 ' + pet['birth_month'] + '월 ' + pet['birth_day']+'일생' + ' / ';
    pet_info += pet['breed'] +' / ';
    pet_info += pet['sex'] == '0' ? '수컷' : '암컷';
    pet_info += ' / 중성화' 
    pet_info += pet['neutering'] == '0' ? ' O' : ' X';
    pet_info += ' / ' + pet['weight']+'kg';
    document.querySelector('.main_title').textContent = pet['name'] + ' 식단 가이드'
    document.querySelector('.pet_info').textContent = pet_info
    document.querySelector('#alg').textContent = list_to_str([...pet['alg'], ...pet['alg_sub']])
    document.querySelector('#health').textContent = list_to_str(pet['health'])
    document.querySelector('.explain').innerHTML = "권장 교체 시기(4-6개월차) 부터는 루이스홈이 "+pet['name']+"가 먹을 수 있는 샘플 사료를<br><br>보내드립니다. 샘플 사료 급여 후 교체 여부를 결정합니다."
    // TODO : 정기구독사료 교체 방법에 이름 추가
}

function onclick_petfoot(index){
    var petfoot_list = document.querySelectorAll('.pet_foot > div > button >img');
    for(var i=0;i<7;i++){
        petfoot_list[i].style.display = 'none';
        if(index == i){
            petfoot_list[i].style.display = 'inline';
        }
        
    }
}

function onclick_qr(index){
    var query = document.querySelectorAll('.qr_form')
    var form_0 = query[0];
    var form_1 = query[1];
    if(qr_index[index] < qr_text.length-1){
        qr_index[index]++;
    }else{
        qr_index[index] = 0;
    }
    if(qr_index[0] == qr_index[1]){
        onclick_qr(index);
    }
    form_0.querySelector('img').src = '../qr/'+qr_text[qr_index[0]]+'.png'
    form_0.querySelector('p').textContent = qr_text_kor[qr_index[0]]
    form_1.querySelector('img').src = '../qr/'+qr_text[qr_index[1]]+'.png'
    form_1.querySelector('p').textContent = qr_text_kor[qr_index[1]]
}













function list_to_str(list_data){
    if(typeof(list_data) == 'object'){
        return JSON.stringify(list_data).replaceAll('[','').replaceAll(']','').replaceAll('"','').replaceAll(',',' ').trim().replaceAll(' ',',  ');
    }
}

function str_to_list(str_data){
    if(typeof(str_data) == "string"){
        str_data = str_data.replaceAll('[','').replaceAll(']','').replaceAll("'","").split(", ")
    }
    for(var index=0; index < str_data.length; index++){
        if(str_data[index] == ''){
            str_data.splice(index,1);
            index--;
        }
    }
    return str_data
}

var petfood_list = [{'pet': '강아지', 'name': '[오리젠] 퍼피', 'brand': '오리젠', 'life_stage': ['퍼피'], 'main_ingredient': '닭, 칠면조, 계란', 'show_product': 'O', 'hash': ['그레인프리', '높은 육류 함유량'], 'detail_explain': ['성장하는 강아지를 위한 영양 설계\r', '소화에 좋은 유산균 함유\r', '맛을 더하는 동결건조']}, {'pet': '강아지', 'name': '[오리젠] 6fish', 'brand': '오리젠', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '정어리, 고등어, 민대구, 가자미, 볼락', 'show_product': 'O', 'hash': ['그레인프리', '높은 어류 함유량'], 'detail_explain': ['피부/피모 건강 증진\r', '소화에 좋은 유산균 함유\r', '맛을 더하는 동결건조']}, {'pet': '강아지', 'name': '[오리젠] 오리지날 독', 'brand': '오리젠', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '닭, 칠면조, 계란', 'show_product': 'O', 'hash': ['그레인프리', '높은 육류 함유량'], 'detail_explain': ['풍부한 육류 함량\r', '소화에 좋은 유산균 함유\r', '맛을 더하는 동결건조']}, {'pet': '강아지', 'name': '[오리젠] 스몰브리드', 'brand': '오리젠', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '칠면조, 닭, 메추리', 'show_product': 'O', 'hash': ['관절건강', '작은알갱이'], 'detail_explain': ['작고 부드러운 알갱이\r', '관절 건강에 좋은 초록입홍합\r', '소화기에 좋은 유산균 함유']}, {'pet': '강아지', 'name': '[오리젠] 시니어 독', 'brand': '오리젠', 'life_stage': ['시니어'], 'main_ingredient': '닭, 계란, 칠면조', 'show_product': 'O', 'hash': ['그레인프리', '높은 육류 함유량'], 'detail_explain': ['노령견을 위한 영양 설계\r', '소화에 좋은 유산균 함유\r', '맛을 더하는 동결건조']}, {'pet': '강아지', 'name': '[오리젠] 피트&트림', 'brand': '오리젠', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '닭, 칠면조', 'show_product': 'O', 'hash': ['그레인프리', '다이어트사료'], 'detail_explain': ['다이어트 사료\r', '소화에 좋은 유산균 함유\r', '맛을 더하는 동결건조']}, {'pet': '강아지', 'name': '[아카나] 싱글즈 프리런 덕', 'brand': '아카나', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '오리', 'show_product': 'O', 'hash': ['단일단백질', '저알레르기'], 'detail_explain': ['식이 알레르기 최소화와 눈물 개선\r', '소화에 좋은 유산균 함유\r', '맛을 더하는 냉동건조']}, {'pet': '강아지', 'name': '[아카나] 싱글즈 요크셔 포크', 'brand': '아카나', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '돼지', 'show_product': 'O', 'hash': ['단일단백질', '저알레르기'], 'detail_explain': ['식이 알레르기 최소화와 눈물 개선\r', '소화에 좋은 유산균 함유\r', '맛을 더하는 냉동건조']}, {'pet': '강아지', 'name': '[아카나] 퍼피 스몰브리드', 'brand': '아카나', 'life_stage': ['퍼피'], 'main_ingredient': '닭, 칠면조', 'show_product': 'O', 'hash': ['그레인프리', '작은알갱이'], 'detail_explain': ['성장하는 강아지를 위한 영양 설계\r', '작고 부드러운 알갱이\r', '맛을 더하는 동결건조']}, {'pet': '강아지', 'name': '[시그널케어] 사랑하개', 'brand': '시그널케어', 'life_stage': ['어덜트'], 'main_ingredient': '식용곤충', 'show_product': 'O', 'hash': ['곤충사료', '저알레르기'], 'detail_explain': ['식이 알레르기 최소화와 눈물 개선\r', '필수 아미노산이 풍부한 식용곤충\r', '관리가 편한 소분 포장']}, {'pet': '강아지', 'name': '[웰니스] 심플 스몰브리드 살몬&포테이토', 'brand': '웰니스', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '연어, 감자', 'show_product': 'O', 'hash': ['단일단백질', '저알레르기'], 'detail_explain': ['식이 알레르기 최소화와 눈물 개선\r', '소화에 좋은 유산균 함유\r', '삼각형 모양의 작은 알갱이']}, {'pet': '강아지', 'name': '[웰니스] 컴플리트헬스 스몰브리드 헬시웨이트', 'brand': '웰니스', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '칠면조, 닭, 연어', 'show_product': 'O', 'hash': ['소화기건강', '다이어트사료'], 'detail_explain': ['다이어트 사료\r', '소화에 좋은 유산균 함유\r', '삼각형 모양의 작은 알갱이']}, {'pet': '강아지', 'name': '[웰니스] 컴플리트헬스 그레인프리 스몰브리드', 'brand': '웰니스', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '칠면조, 닭, 연어', 'show_product': 'O', 'hash': ['그레인프리', '소화기건강'], 'detail_explain': ['Grain Free(그레인프리)\r', '소화에 좋은 유산균 함유\r', '삼각형 모양의 작은 알갱이']}, {'pet': '강아지', 'name': '[웰니스] 컴플리트헬스 스몰브리드 시니어', 'brand': '웰니스', 'life_stage': ['시니어'], 'main_ingredient': '칠면조, 닭', 'show_product': 'O', 'hash': ['그레인프리', '소화기건강', '노령견사료'], 'detail_explain': ['노령견을 위한 영양 설계\r', '소화에 좋은 유산균 함유\r', '삼각형 모양의 작은 알갱이']}, {'pet': '강아지', 'name': '[토우] 구운오리&고구마 독', 'brand': '테이스트오브더와일드', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '오리, 닭, 고구마', 'show_product': 'O', 'hash': [''], 'detail_explain': ['혈관 질환 예방과 피부 건강\r', '지속형 탄수화물 고구마\r', 'Grain Free(그레인프리)']}, {'pet': '강아지', 'name': '[토우] 훈제연어&고구마 독', 'brand': '테이스트오브더와일드', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '연어', 'show_product': 'O', 'hash': [''], 'detail_explain': ['피부/피모 건강 증진\r', '지속형 탄수화물 고구마\r', 'Grain Free(그레인프리)']}, {'pet': '강아지', 'name': '[인스팅트] RBK 헬시웨이트 독', 'brand': '인스팅트', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': ['그레인프리', '다이어트사료'], 'detail_explain': ['다이어트 사료\r', 'Grain Free(그레인프리)\r', '풍부한 유산균과 면역력 증진']}, {'pet': '강아지', 'name': '[인스팅트]  RBK 시니어', 'brand': '인스팅트', 'life_stage': ['시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['노령견을 위한 영양 설계\r', '맛과 영양을 더하는 생식 코팅\r', 'Grain Free(그레인프리)']}, {'pet': '강아지', 'name': '[인스팅트]  RBK 오리고기', 'brand': '인스팅트', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '오리', 'show_product': 'O', 'hash': [''], 'detail_explain': ['혈관 질환 예방과 피부 건강\r', '맛과 영양을 더하는 생식 코팅\r', 'Grain Free(그레인프리)']}, {'pet': '강아지', 'name': '[인스팅트]  RBK 치킨 독', 'brand': '인스팅트', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': ['그레인프리', '면역력향상'], 'detail_explain': ['Grain Free(그레인프리)\r', '맛과 영양을 더하는 생식 코팅\r', '풍부한 유산균과 면역력 증진']}, {'pet': '강아지', 'name': '[인스팅트] 얼티밋 프로틴 독', 'brand': '인스팅트', 'life_stage': ['퍼피', '어덜트'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': ['면역력향상', '높은 육류 함유량'], 'detail_explain': ['자유 방목 닭을 사용한 고단백 사료\r', '맛과 영양을 더하는 생식 코팅\r', '풍부한 유산균과 면역력 증진']}, {'pet': '강아지', 'name': '[인스팅트] BE 내추럴 독', 'brand': '인스팅트', 'life_stage': ['어덜트'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['소화기 건강에 좋은 사료\r', 'Grain Free(그레인프리)\r', '맛과 영양을 더하는 생식 코팅']}, {'pet': '강아지', 'name': '[인스팅트] BE 내추럴 연어', 'brand': '인스팅트', 'life_stage': ['어덜트'], 'main_ingredient': '연어', 'show_product': 'O', 'hash': [''], 'detail_explain': ['소화기 건강에 좋은 사료\r', 'Grain Free(그레인프리)\r', '맛과 영양을 더하는 생식 코팅']}, {'pet': '강아지', 'name': '[인스팅트] 오리지날 토끼고기', 'brand': '인스팅트', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '토끼', 'show_product': 'O', 'hash': [''], 'detail_explain': ['희귀단백질 토끼\r', 'Grain Free(그레인프리)\r', '풍부한 유산균과 면역력 증진']}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 올브리드 어덜트 피쉬', 'brand': '나우', 'life_stage': ['어덜트'], 'main_ingredient': '송어', 'show_product': 'O', 'hash': ['항산화', '그레인프리'], 'detail_explain': ['성견을 위한 맞춤 영양\r', 'Grain Free(그레인프리)\r', '소화를 돕는 유산균과 호박']}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 올브리드 어덜트', 'brand': '나우', 'life_stage': ['어덜트'], 'main_ingredient': '칠면조', 'show_product': 'O', 'hash': ['항산화', '그레인프리'], 'detail_explain': ['성견을 위한 맞춤 영양\r', 'Grain Free(그레인프리)\r', '소화를 돕는 유산균과 호박']}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 스몰브리드 어덜트 피쉬', 'brand': '나우', 'life_stage': ['어덜트'], 'main_ingredient': '송어', 'show_product': 'O', 'hash': ['그레인프리', '부드러운알갱이'], 'detail_explain': ['잘 부서지는 클로버 모양의 키블\r', 'Grain Free(그레인프리)\r', '소화를 돕는 유산균과 호박']}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 스몰브리드 시니어', 'brand': '나우', 'life_stage': ['시니어'], 'main_ingredient': '칠면조', 'show_product': 'O', 'hash': ['관절건강', '그레인프리'], 'detail_explain': ['관절이 약한 노령견을 위한 초록입홍합\r', '잘 부서지는 클로버 모양의 키블\r', 'Grain Free(그레인프리)']}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 스몰브리드 어덜트', 'brand': '나우', 'life_stage': ['어덜트'], 'main_ingredient': '칠면조', 'show_product': 'O', 'hash': ['유산균?', '그레인프리'], 'detail_explain': ['잘 부서지는 클로버 모양의 키블\r', 'Grain Free(그레인프리)\r', '소화를 돕는 유산균과 호박']}, {'pet': '강아지', 'name': '[나우] 프레쉬(그레인프리) 스몰브리드 퍼피', 'brand': '나우', 'life_stage': ['퍼피'], 'main_ingredient': '칠면조', 'show_product': 'O', 'hash': ['유산균', '그레인프리'], 'detail_explain': ['성장기 강아지를 위한 영양 설계\r', 'Grain Free (그레인프리)\r', '소화를 돕는 풍부한 유산균']}, {'pet': '강아지', 'name': '[GO!] LID 오리 레시피', 'brand': 'GO!', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '오리', 'show_product': 'O', 'hash': ['LID사료', '저알레르기'], 'detail_explain': ['알레르기 예방을 위한 제한적 원료(LID)\r', '혈관 질환 예방과 피부 건강\r', '흡수율 높은 미네랄']}, {'pet': '강아지', 'name': '[GO!] LID 칠면조 레시피', 'brand': 'GO!', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '칠면조', 'show_product': 'O', 'hash': ['LID사료', '저알레르기'], 'detail_explain': ['타임즈가 선정한 육류 칠면조\r', '알레르기 예방을 위한 제한적 원료(LID)\r', '흡수율 높은 미네랄']}, {'pet': '강아지', 'name': '[GO!] LID 연어 레시피', 'brand': 'GO!', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '연어', 'show_product': 'O', 'hash': ['LID사료', '저알레르기'], 'detail_explain': ['윤기 나는 피부를 위한 연어\r', '알레르기 예방을 위한 제한적 원료(LID)\r', '흡수율 높은 미네랄']}, {'pet': '강아지', 'name': '[GO!] LID 연어 레시피 스몰브리드', 'brand': 'GO!', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '연어', 'show_product': 'O', 'hash': ['LID사료', '저알레르기'], 'detail_explain': ['윤기 나는 피부를 위한 연어\r', '알레르기 예방을 위한 제한적 원료(LID)\r', '흡수율 높은 미네랄']}, {'pet': '강아지', 'name': '[워프] 에어드라이드 베니슨(사슴고기)', 'brand': '워프', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '사슴, 양', 'show_product': 'O', 'hash': [''], 'detail_explain': ['영양소와 맛을 보존하는 에어드라이\r', '관절 건강과 피부 건강을 동시에\r', 'Grain Free (그레인 프리)']}, {'pet': '강아지', 'name': '[워프] 에어드라이드 비프(소고기)', 'brand': '워프', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '소', 'show_product': 'O', 'hash': ['관절건강', '그레인프리'], 'detail_explain': ['영양소와 맛을 보존하는 에어드라이\r', '관절건강과 피부건강을 동시에\r', 'Grain Free (그레인 프리)']}, {'pet': '강아지', 'name': '[워프] 동결건조 와일드고트(야생염소)', 'brand': '워프', 'life_stage': ['어덜트'], 'main_ingredient': '염소, 양', 'show_product': 'O', 'hash': [''], 'detail_explain': ['맛과 영양을 지키는 동결건조\r', '철분과 비타민이 풍부한 야생산양\r', 'Grain Free (그레인프리)']}, {'pet': '강아지', 'name': '[지위픽] 에어드라이 트라이프&양고기', 'brand': '지위픽', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '양', 'show_product': 'O', 'hash': ['관절건강', '단일단백질', '저알레르기'], 'detail_explain': ['영양소와 맛을 보존하는 에어드라이\r', '관절 건강을 위한 초록입홍합\r', '알레르기 걱정을 덜어주는 단일 단백질']}, {'pet': '강아지', 'name': '[지위픽] 에어드라이 닭고기 독', 'brand': '지위픽', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': ['관절건강', '단일단백질', '저알레르기'], 'detail_explain': ['영양소와 맛을 보존하는 에어드라이\r', '관절 건강을 위한 초록입홍합\r', '알레르기 걱정을 덜어주는 단일 단백질']}, {'pet': '강아지', 'name': '[지위픽] 에어드라이 양고기 독', 'brand': '지위픽', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '양', 'show_product': 'O', 'hash': ['관절건강', '단일단백질', '저알레르기'], 'detail_explain': ['영양소와 맛을 보존하는 에어드라이\r', '관절 건강을 위한 초록입홍합\r', '알레르기 걱정을 덜어주는 단일 단백질']}, {'pet': '강아지', 'name': '[지위픽] 에어드라이 소고기 독', 'brand': '지위픽', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '소', 'show_product': 'O', 'hash': ['관절건강', '단일단백질', '저알레르기'], 'detail_explain': ['영양소와 맛을 보존하는 에어드라이\r', '관절 건강을 위한 초록입홍합\r', '알레르기 걱정을 덜어주는 단일 단백질']}, {'pet': '강아지', 'name': '[지위픽] 에어드라이 사슴고기 독', 'brand': '지위픽', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '사슴', 'show_product': 'O', 'hash': ['관절건강', '단일단백질', '저알레르기'], 'detail_explain': ['영양소와 맛을 보존하는 에어드라이\r', '관절 건강을 위한 초록입홍합\r', '알레르기 예방을 위한 단일 단백질']}, {'pet': '강아지', 'name': '[파미나] N&D 독 그레인프리 청어&오렌지 미니', 'brand': '파미나', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '청어', 'show_product': 'O', 'hash': [''], 'detail_explain': ['알레르기 예방과 피부에 좋은 청어\r', '높은 프로바이오틱스 함유량\r', '맛과 영양을 더하는 냉장 압착 건조 과일']}, {'pet': '강아지', 'name': '[파미나] N&D 독 그레인프리 펌프킨 닭고기&석류 미니', 'brand': '파미나', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['당뇨를 예방하는 단호박\r', '높은 프로바이오틱스 함유량\r', '맛과 영양을 더하는 냉장 압착 건조 과일']}, {'pet': '강아지', 'name': '[파미나] N&D 독 그레인프리 펌프킨 멧돼지&사과 미니', 'brand': '파미나', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '멧돼지', 'show_product': 'O', 'hash': ['단일단백질', '저알레르기'], 'detail_explain': ['알레르기 예방을 위한 단일 단백질\r', '높은 프로바이오틱스 함유량\r', '맛과 영양을 더하는 냉장 압착 건조 과일']}, {'pet': '강아지', 'name': '[파미나] N&D 독 그레인프리 펌프킨 대구&오렌지 미니', 'brand': '파미나', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '대구', 'show_product': 'O', 'hash': ['단일단백질', '저알레르기'], 'detail_explain': ['알레르기 예방과 피부에 좋은 대구\r', '높은 프로바이오틱스 함유량\r', '맛과 영양을 더하는 냉장 압착 건조 과일']}, {'pet': '강아지', 'name': '[파미나] N&D 독 로우그레인 닭고기&석류 미니', 'brand': '파미나', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['혈당조절과 심장에 좋은 원시 곡물\r', '높은 프로바이오틱스 함유량\r', '맛과 영양을 더하는 냉장 압착 건조 과일']}, {'pet': '강아지', 'name': '[디바크] 센스 터키 앤 살몬 퍼피', 'brand': '디바크', 'life_stage': ['퍼피'], 'main_ingredient': '칠면조, 연어', 'show_product': 'O', 'hash': ['관절건강', '면역력향상'], 'detail_explain': ['관절 건강 케어 (조인트 프로텍터)\r', '면역력 향상과 피부 건강\r', '편안한 소화를 돕는 허브']}, {'pet': '강아지', 'name': '[디바크] 센스 살몬 어덜트', 'brand': '디바크', 'life_stage': ['어덜트'], 'main_ingredient': '연어', 'show_product': 'O', 'hash': ['관절건강', '면역력향상'], 'detail_explain': ['관절 건강 케어 (조인트 프로텍터)\r', '면역력 향상과 피부 건강\r', '편안한 소화를 돕는 허브']}, {'pet': '강아지', 'name': '[워프] 동결건조 램(양고기)', 'brand': '워프', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '양', 'show_product': 'O', 'hash': [''], 'detail_explain': ['맛과 영양을 지키는 동결건조\r', '필수 아미노산이 풍부한 양\r', 'Grain Free (그레인프리)']}, {'pet': '강아지', 'name': '[워프] 동결건조 비프(소고기)', 'brand': '워프', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '소', 'show_product': 'O', 'hash': ['관절건강', '동결건조', '그레인프리'], 'detail_explain': ['맛과 영양을 지키는 동결건조\r', '고단백 저지방 소고기와 초록입홍합\r', 'Grain Free (그레인프리)']}, {'pet': '강아지', 'name': '[워프] 동결건조 와일드베니슨(야생사슴)', 'brand': '워프', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '사슴', 'show_product': 'O', 'hash': ['관절건강', '동결건조', '그레인프리'], 'detail_explain': ['맛과 영양을 지키는 동결건조\r', '비타민B가 풍부한 야생 사슴과 초록입홍합\r', 'Grain Free (그레인프리)']}, {'pet': '강아지', 'name': '[디바크] 센스 덕 앤 터키 시니어', 'brand': '디바크', 'life_stage': ['시니어'], 'main_ingredient': '오리', 'show_product': 'O', 'hash': ['관절건강', '면역력향상'], 'detail_explain': ['관절 건강 케어 (조인트 프로텍터)\r', '면역력 향상과 피부 건강\r', '편안한 소화를 돕는 허브']}, {'pet': '강아지', 'name': '[토우] 훈제연어&고구마 퍼피', 'brand': '테이스트오브더와일드', 'life_stage': ['퍼피'], 'main_ingredient': '연어, 고구마', 'show_product': 'O', 'hash': [''], 'detail_explain': ['성장하는 강아지를 위한 비타민E\r', '윤기 나는 피부를 위한 연어\r', 'Grain Free(그레인프리) 와 풍부한 유산균']}, {'pet': '강아지', 'name': '[맥아담스] 방목치킨 시니어&라이트', 'brand': '맥아담스', 'life_stage': ['시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': ['오븐베이크', '다이어트사료'], 'detail_explain': ['바삭한 식감의 오븐베이크 공법\r', '관절 건강을 생각한 다이어트 사료\r', '소화에 좋은 유산균과 영양 비율']}, {'pet': '강아지', 'name': '[맥아담스] 방목치킨 소형견용', 'brand': '맥아담스', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': ['관절건강', '자유방목닭'], 'detail_explain': ['바삭한 식감의 오븐베이크 공법\r', '관절 건강을 위한 초록입홍합\r', '소화에 좋은 유산균과 고구마']}, {'pet': '강아지', 'name': '[맥아담스] 방목치킨 중형견용', 'brand': '맥아담스', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': ['관절건강', '자유방목닭'], 'detail_explain': ['바삭한 식감의 오븐베이크 공법\r', '관절 건강을 위한 초록입홍합\r', '소화에 좋은 유산균과 고구마']}, {'pet': '강아지', 'name': '[맥아담스] 방목치킨&연어 소형견용', 'brand': '맥아담스', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '닭, 연어', 'show_product': 'O', 'hash': ['관절건강', '오븐베이크'], 'detail_explain': ['바삭한 식감의 오븐베이크 공법\r', '관절 건강을 위한 초록입홍합\r', '소화에 좋은 유산균과 고구마']}, {'pet': '강아지', 'name': '[맥아담스] 방목치킨&연어 중형견용', 'brand': '맥아담스', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '닭, 연어', 'show_product': 'O', 'hash': [''], 'detail_explain': ['바삭한 식감의 오븐베이크 공법\r', '관절 건강을 위한 초록입홍합\r', '소화에 좋은 유산균과 고구마']}, {'pet': '강아지', 'name': '[퓨리나] 프로플랜 슈레드 강아지', 'brand': '퓨리나', 'life_stage': ['퍼피'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['쫄깃한 식감의 슈레드 키블\r', '편안한 소화를 위한 쌀\r', '필수 아미노산이 풍부한 닭고기']}, {'pet': '강아지', 'name': '[퓨리나] 프로플랜 슈레드 소형견', 'brand': '퓨리나', 'life_stage': ['어덜트'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['쫄깃한 식감의 슈레드 키블\r', '편안한 소화를 위한 쌀\r', '필수 아미노산이 풍부한 닭고기']}, {'pet': '강아지', 'name': '[퓨리나] 프로플랜 슈레드 노령견', 'brand': '퓨리나', 'life_stage': ['시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['쫄깃한 식감의 슈레드 키블\r', '편안한 소화를 위한 쌀\r', '필수 아미노산이 풍부한 닭고기']}, {'pet': '강아지', 'name': '[퓨리나] 프로플랜 토이 퍼피', 'brand': '퓨리나', 'life_stage': ['퍼피'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['성장하는 강아지의 소화기 건강\r', '치석 제거를 돕는 사료 알갱이\r', '필수 아미노산이 풍부한 닭고기']}, {'pet': '강아지', 'name': '[허즈] 독 칠면조가슴살 레시피', 'brand': '허즈', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '칠면조', 'show_product': 'O', 'hash': [''], 'detail_explain': ['식이 알레르기 최소화와 눈물 개선\r', '타임즈가 선정한 육류 칠면조\r', '영양소와 맛을 보존하는 에어드라이']}, {'pet': '강아지', 'name': '[허즈] 독 닭가슴살 레시피', 'brand': '허즈', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['식이 알레르기 최소화와 눈물 개선\r', '필수 아미노산이 풍부한 닭고기\r', '영양소와 맛을 보존하는 에어드라이']}, {'pet': '강아지', 'name': '[카일리] 소프트프레쉬 그레인프리 터키 미니', 'brand': '카일리', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '칠면조', 'show_product': 'O', 'hash': [''], 'detail_explain': ['관절 건강과 피부 건강을 위한 사료\r', '면역력을 높여주는 스위스 야생 허브\r', '타임즈가 선정한 육류 칠면조']}, {'pet': '강아지', 'name': '[카일리] 소프트프레쉬 그레인프리 치킨 미니', 'brand': '카일리', 'life_stage': ['퍼피', '어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['관절 건강과 피부 건강을 위한 사료\r', '면역력을 높여주는 스위스 야생 허브\r', '필수 아미노산이 풍부한 닭고기']}, {'pet': '고양이', 'name': '[아카나] 와일드 프레이리 캣', 'brand': '아카나', 'life_stage': ['키튼', '어덜트', '시니어'], 'main_ingredient': '닭, 칠면조', 'show_product': 'O', 'hash': [''], 'detail_explain': ['풍부한 육류 함량\r', '건강한 심장과 눈 건강\r', '기호성을 높이는 동결건조']}, {'pet': '고양이', 'name': '[아카나] 그래스랜드 캣', 'brand': '아카나', 'life_stage': ['키튼', '어덜트', '시니어'], 'main_ingredient': '오리, 닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['풍부한 육류 함량\r', '소화에 좋은 유산균 함유\r', '기호성을 높이는 동결건조']}, {'pet': '고양이', 'name': '[아카나] 패시피카 캣', 'brand': '아카나', 'life_stage': ['키튼', '어덜트', '시니어'], 'main_ingredient': '청어, 고등어', 'show_product': 'O', 'hash': [''], 'detail_explain': ['풍부한 어류 함량\r', '피부/피모 건강 증진\r', '소화에 좋은 유산균 함유']}, {'pet': '고양이', 'name': '[오리젠] 캣&키튼', 'brand': '오리젠', 'life_stage': ['키튼'], 'main_ingredient': '닭, 칠면조', 'show_product': 'O', 'hash': [''], 'detail_explain': ['성장하는 고양이를 위한 영양 설계\r', '기호성을 높이는 동결건조\r', '소화에 좋은 유산균 함유']}, {'pet': '고양이', 'name': '[오리젠] 6피쉬 캣', 'brand': '오리젠', 'life_stage': ['키튼', '어덜트', '시니어'], 'main_ingredient': '정어리, 민대구, 고등어, 가자미, 볼락, 광어', 'show_product': 'O', 'hash': [''], 'detail_explain': ['풍부한 어류 함량\r', '피부/피모 건강 증진\r', '소화에 좋은 유산균 함유']}, {'pet': '고양이', 'name': '[오리젠] 피트&트림 캣', 'brand': '오리젠', 'life_stage': ['키튼', '어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['다이어트 사료\r', '소화에 좋은 유산균 함유\r', '맛을 더하는 동결건조']}, {'pet': '고양이', 'name': '[파미나] N&D CAT 로우그레인(귀리) 닭고기&석류', 'brand': '파미나', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['혈당조절과 심장에 좋은 원시 곡물\r', '높은 프로바이오틱스 함유량\r', '맛과 영양을 더하는 냉장 압착 건조 과일']}, {'pet': '고양이', 'name': '[파미나] N&D CAT 오션 로우 엔세스트럴 그레인대구&오렌지', 'brand': '파미나', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '대구', 'show_product': 'O', 'hash': [''], 'detail_explain': ['혈당조절과 심장에 좋은 원시 곡물과 대구\r', '높은 프로바이오틱스 함유량\r', '맛과 영양을 더하는 냉장 압착 건조 과일']}, {'pet': '고양이', 'name': '[파미나] N&D CAT 그레인프리 닭고기&석류', 'brand': '파미나', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '닭', 'show_product': 'O', 'hash': [''], 'detail_explain': ['Grain Free (그레인프리)\r', '높은 프로바이오틱스 함유량\r', '맛과 영양을 더하는 냉장 압착 건조 과일']}, {'pet': '고양이', 'name': '[파미나] N&D CAT 그레인프리 멧돼지&사과', 'brand': '파미나', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '멧돼지', 'show_product': 'O', 'hash': [''], 'detail_explain': ['Grain Free (그레인프리)\r', '높은 프로바이오틱스 함유량\r', '맛과 영양을 더하는 냉장 압착 건조 과일']}, {'pet': '고양이', 'name': '[파미나] N&D CAT 오션 그레인프리 청어&오렌지', 'brand': '파미나', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '청어', 'show_product': 'O', 'hash': [''], 'detail_explain': ['피부/피모 건강 증진\r', 'Grain Free (그레인프리)\r', '높은 프로바이오틱스 함유량']}, {'pet': '고양이', 'name': '[파미나] N&D CAT 퀴노아 유리너리 오리', 'brand': '파미나', 'life_stage': ['어덜트', '시니어'], 'main_ingredient': '오리', 'show_product': 'O', 'hash': [''], 'detail_explain': ['결석과 비뇨기에 좋은 퀴노아\r', '높은 프로바이오틱스 함유량\r', '맛과 영양을 더하는 냉장 압착 건조 과일']}]
