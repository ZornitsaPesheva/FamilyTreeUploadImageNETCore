
var family = new FamilyTree(document.getElementById("tree"), {
    mouseScrool: FamilyTree.action.none,
    editForm: {
        photoBinding: "ImgUrl",
        elements: [
            { type: 'textbox', label: 'Photo Url', binding: 'ImgUrl', btn: 'Upload' },
        ]
    },
    nodeBinding: {
        field_0: "name",
        img_0: "ImgUrl"
    }
});

family.onInit(function () {
    this.editUI.show(1, false)
});

family.editUI.on('element-btn-click', function (sender, args) {
    FamilyTree.fileUploadDialog(function (file) {
        var formData = new FormData();
        formData.append('files', file);

        fetch('/Home/UploadPhoto', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                response.json().then(responseData => {
                    args.input.value = responseData.url;
                    sender.setAvatar(responseData.url);
                });
            })
            .catch((error) => {
                console.log(error)
            });;
    })
});

family.load([
    { id: 1, name: "Jack Hill", ImgUrl: "https://cdn.balkan.app/shared/16.jpg", gender: "female" },
]);