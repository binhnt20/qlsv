document.addEventListener('DOMContentLoaded', () => {
  classElm = document.querySelector('#list-class');
  userElm = document.querySelector('#userCurrent');
  backBtn = document.querySelector('#back > a');
  classCurrent = document.querySelector('#classCurrent');
  listCheckin = document.querySelector('#list-checkin');
  logoutBtn = document.querySelector('#logout');
  getToken();
  init();
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    if (!window.location.href.includes('login.html'))
      return window.location.replace('./login.html');
  });
});

let accessToken,
  classElm,
  backBtn,
  userElm,
  classCurrent,
  listCheckin,
  logoutBtn,
  localStore = new StoreLocal(),
  baseUrl = 'http://localhost:3333/api';

const checkUserInfo = async (token) => {
  const userDetail = (await getData(token, 'user')).data;
  if (userDetail.state === 0 && !window.location.href.includes('login.html'))
    return window.location.replace('./login.html');
  return userDetail;
};

const getToken = async () => {
  const user = localStore.getItem('userInfo');
  if (!user && !window.location.href.includes('login.html'))
    window.location.replace('./login.html');
  accessToken = JSON.parse(user).accessToken;
  await checkUserInfo(accessToken);
  userElm.innerHTML = JSON.parse(user).fullname;
};

const init = async () => {
  backBtn.style.display = 'none';
  listCheckin.style.display = 'none';
  localStore.removeItem('classId');
  const listClass = await getData(accessToken);
  renderElm(listClass.data, classElm, 'class');
};

const getData = (accessToken, params = 'class') =>
  axios.get(`${baseUrl}/${params}`, {
    headers: {
      Authorization: accessToken,
    },
  });

const calApi = (accessToken, data, params = 'checkin') =>
  axios.post(`${baseUrl}/${params}`, data, {
    headers: {
      Authorization: accessToken,
    },
  });

const renderElm = async (
  listElm,
  wrapper,
  type = 'table',
  isTeacher = false
) => {
  const classId = localStore.getItem('classId');
  if (classId) {
    backBtn.style.display = 'inline-block';
    const userInfo = await checkUserInfo(accessToken);
    if (userInfo?.role === 'teacher') listCheckin.style.display = 'flex';
  }
  if (!listElm?.length) {
    wrapper.innerHTML = '<p id="empty">Danh sách hiện đang trống!</p>';
    return;
  }
  backBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const listClass = await getData(accessToken);
    renderElm(listClass.data, classElm, 'class');
    localStore.removeItem('classId');
    backBtn.style.display = 'none';
    classCurrent.innerHTML = '';
  });
  wrapper.innerHTML = '';
  listElm.forEach((element, index) => {
    const { id, name, state, fullname, username } = element,
      li = document.createElement('li');
    li.innerHTML = `<div class="item ${
      state && (username || fullname) ? 'actived' : ''
    }" ${
      state && !username && !fullname && type === 'checkin' && !isTeacher
        ? ''
        : `onclick="handleClick(${id},'${accessToken}','${type}')"`
    }><span>${name || `Bàn ${index + 1}`}${
      state && (username || fullname)
        ? ` <span>(${fullname || username})</span>`
        : ''
    }</span></div>`;
    wrapper.append(li);
  });
};

const handleClick = async (id, token, action) => {
  const classId = localStore.getItem('classId');
  if (action === 'class' && !classId) {
    localStore.setItem('classId', id);
    const listTable = await getData(token, `table?classId=${id}`),
      detailClass = (await getData(token, `class/${id}`)).data;
    classCurrent.innerHTML = detailClass?.name && `Lớp ${detailClass?.name}`;
    renderElm(listTable.data, classElm, 'checkin');
  }
  if (action === 'table') {
    const listTable = await getData(token, `table?classId=${id}`),
      userInfo = await checkUserInfo(accessToken);
    renderElm(listTable.data, classElm, 'checkin', userInfo.role === 'teacher');
  }
  if (action === 'checkin') {
    await checkUserInfo(accessToken);
    const checkin = (await calApi(token, { tableId: id }, 'check-in'))?.data;
    let title = checkin?.state === 0 ? 'Warning!' : 'Success!',
      icon = checkin?.state === 0 ? 'warning' : 'success';
    Swal.fire({
      title,
      text: checkin.msg,
      icon,
      confirmButtonText: 'Ok',
    });
    const listTable = await getData(token, `table?classId=${classId}`);
    renderElm(listTable.data, classElm, 'checkin');
    console.log(checkin);
  }
};
