const $actions = document.getElementById('actions');
const $profileForm = document.getElementById('profileForm');
const $passwordForm = document.getElementById('passwordForm');
const $saveButton = document.getElementById('save');
const $avatarWrapper = document.getElementById('avatar_wrapper');
const $chengeAvatarDialog = document.querySelector('dialog');
console.log($chengeAvatarDialog);
const actions = {
  editData() {
    $actions.hidden = true;
    $saveButton.hidden = false;
    $profileForm.hidden = false;
    $passwordForm.hidden = true;
  },
  editPassword() {
    $actions.hidden = true;
    $saveButton.hidden = false;
    $profileForm.hidden = true;
    $passwordForm.hidden = false;
  },
  exit() {
    window.location.replace('chats.html');
  },
};
$avatarWrapper.addEventListener('click', () => {
  $chengeAvatarDialog.showModal();
});
function showChangeData() {
  $actions.hidden = true;
  $saveButton.hidden = false;
  $profileForm.hidden = false;
  $passwordForm.hidden = true;
}

$saveButton.addEventListener('click', function () {
  this.hidden = true;
  $actions.hidden = false;
});
Array.from($actions.children).forEach(($li) => {
  const [button] = $li.children;
  button.addEventListener('click', actions[button.id]);
});
