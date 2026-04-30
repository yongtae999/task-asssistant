// 등록된 프로젝트(앱) 목록
// 새로운 프로젝트가 생기면 이곳 배열에 객체를 추가하기만 하면 대시보드에 자동으로 나타납니다.
const appsData = [
    {
        id: 'news-radar',
        title: '뉴스 레이더',
        description: '업무관련 종사자의 분야별 뉴스 검색 및 법령 검색을 지원합니다.',
        icon: 'map', // Material Icons 이름
        theme: 'theme-blue',
        url: 'https://yongtae999.github.io/news-rader/index.html'
    },
    {
        id: 'kit-receipt',
        title: '전자 인수증',
        description: '야생동물 질병진단용 채혈키트 모바일 전자 인수증 발급 및 전자서명 시스템입니다.',
        icon: 'receipt_long',
        theme: 'theme-green',
        url: 'https://yongtae999.github.io/wildlife-management-system/kit-receipt/index.html'
    },
    {
        id: 'system-manual',
        title: '시스템 소개',
        description: '야생생물관리시스템 공무원 및 관리자용 사용 설명서 및 소개 자료입니다.',
        icon: 'menu_book',
        theme: 'theme-orange',
        url: 'https://yongtae999.github.io/wildlife-management-system/wildlife_system_manual.html'
    },
    {
        id: 'contact-manager',
        title: '스마트 연락처 관리',
        description: '카메라로 명함을 찍으면 AI가 글씨를 읽어 자동으로 저장하고 엑셀로 관리합니다.',
        icon: 'contacts',
        theme: 'theme-purple',
        url: 'https://yongtae999.github.io/contact-manager/index.html'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const logoutBtn = document.getElementById('logout-btn');
    const errorMsg = document.getElementById('login-error');
    const appGrid = document.getElementById('app-grid');

    // 세션 체크 (간단한 로컬 스토리지 기반 유지)
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
    }

    // 등록된 사용자 목록 (이름: 휴대폰 번호 뒤 4자리)
    const validUsers = {
        "이인모": "8344", "문혜선": "1380", // 서울인천경기
        "심영배": "6238", "권혁주": "8788", // 강원
        "민정은": "7340", // 충북
        "권용태": "4842", // 대전충남세종
        "류석대": "0038", "민경태": "4519", "박주연": "6469", // 대구경북
        "황동간": "7501", "박도범": "4949", // 부산울산경남
        "정영국": "0000", "양현진": "2082", // 전북
        "이범기": "4040", "선아영": "6578", // 광주전남
        "고광범": "8434", "장호진": "5892", // 제주
        "김철훈": "1119", "이명재": "7473", "이지선": "7373", // 본부 임직원
        "문이랑": "2223", "최수아": "0603", "장유경": "1218", // 본부 임직원
        "권태수": "7499"  // 신규 추가
    };

    // 로그인 처리
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // 사용자 이름이 목록에 존재하고, 비밀번호(뒤 4자리)가 일치하는지 검사
        if (validUsers[username] && validUsers[username] === password) {
            // 로그인 성공
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            
            // 환영 메시지 업데이트
            const userInfo = document.querySelector('.user-info');
            if(userInfo) userInfo.textContent = `${username}님 환영합니다`;

            showDashboard();
        } else {
            errorMsg.style.display = 'block';
        }
    });

    // 로그아웃 처리
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        
        // 폼 초기화
        loginForm.reset();
        errorMsg.style.display = 'none';
        
        showLogin();
    });

    // 화면 전환 함수
    function showDashboard() {
        loginScreen.classList.remove('active');
        setTimeout(() => {
            dashboardScreen.classList.add('active');
            renderApps();
        }, 300); // fade out 이후 fade in
    }

    function showLogin() {
        dashboardScreen.classList.remove('active');
        setTimeout(() => {
            loginScreen.classList.add('active');
        }, 300);
    }

    // 대시보드 앱 목록 렌더링
    function renderApps() {
        appGrid.innerHTML = ''; // 초기화

        // 기존 앱 렌더링
        appsData.forEach(app => {
            const card = document.createElement('a');
            card.href = app.url;
            card.className = `app-card ${app.theme}`;
            // 새 탭에서 열리도록 (선택 사항 - 포털 내에서 이동할지 새창으로 띄울지)
            // card.target = '_blank'; 
            
            card.innerHTML = `
                <div class="app-icon-wrapper">
                    <span class="material-icons-rounded">${app.icon}</span>
                </div>
                <h4>${app.title}</h4>
                <p>${app.description}</p>
                <span class="material-icons-rounded launch-icon">arrow_forward</span>
            `;
            
            appGrid.appendChild(card);
        });

        // '새로운 프로젝트 추가' (관리자용 가이드 버튼)
        const addCard = document.createElement('div');
        addCard.className = 'app-card theme-add';
        addCard.style.cursor = 'pointer';
        addCard.innerHTML = `
            <div class="app-icon-wrapper">
                <span class="material-icons-rounded">add</span>
            </div>
            <h4>새 프로젝트 추가</h4>
            <p>script.js 파일의 appsData 배열에 항목을 추가하면 여기에 새로운 시스템이 연결됩니다.</p>
        `;
        addCard.addEventListener('click', () => {
            alert('새 프로젝트를 추가하려면 \\ntask-assistant/script.js 파일에서 \\nappsData 배열에 새 프로젝트 정보를 입력하세요.');
        });
        
        appGrid.appendChild(addCard);
    }
});
