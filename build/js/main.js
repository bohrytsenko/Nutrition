$(document).ready(function(){var e=document.getElementById("scene");new Parallax(e,{relativeInput:!0});$(".modal__close a").on("click",function(){$(".modal").fadeOut(),$(".modal_bl").removeClass("modal_bl__over")}),$(".modal_bl").on("click",function(){$(".modal").fadeOut(),$(this).removeClass("modal_bl__over")})});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJzY2VuZSIsImdldEVsZW1lbnRCeUlkIiwiUGFyYWxsYXgiLCJyZWxhdGl2ZUlucHV0Iiwib24iLCJmYWRlT3V0IiwicmVtb3ZlQ2xhc3MiLCJ0aGlzIl0sIm1hcHBpbmdzIjoiQUFHQUEsRUFBR0MsVUFBV0MsTUFBTSxXQUloQixJQUFJQyxFQUFRRixTQUFTRyxlQUFlLFNBQ2IsSUFBSUMsU0FBU0YsR0FDaENHLGVBQWUsSUFLbkJOLEVBQUUsbUJBQW1CTyxHQUFHLFFBQVMsV0FDN0JQLEVBQUUsVUFBVVEsVUFDWlIsRUFBRSxhQUFhUyxZQUFZLG9CQUcvQlQsRUFBRSxhQUFhTyxHQUFHLFFBQVMsV0FDdkJQLEVBQUUsVUFBVVEsVUFDWlIsRUFBRVUsTUFBTUQsWUFBWSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEN1c3RvbVxuICovXG4kKCBkb2N1bWVudCApLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gVG9tYXRvIHBhcmFsbGF4XG5cbiAgICB2YXIgc2NlbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NlbmUnKTtcbiAgICB2YXIgcGFyYWxsYXhJbnN0YW5jZSA9IG5ldyBQYXJhbGxheChzY2VuZSwge1xuICAgICAgICByZWxhdGl2ZUlucHV0OiB0cnVlXG4gICAgfSk7XG5cbiAgICAvLyBDbG9zZSBtb2RhbFxuXG4gICAgJCgnLm1vZGFsX19jbG9zZSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcubW9kYWwnKS5mYWRlT3V0KCk7XG4gICAgICAgICQoJy5tb2RhbF9ibCcpLnJlbW92ZUNsYXNzKCdtb2RhbF9ibF9fb3ZlcicpO1xuICAgIH0pO1xuXG4gICAgJCgnLm1vZGFsX2JsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcubW9kYWwnKS5mYWRlT3V0KCk7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ21vZGFsX2JsX19vdmVyJyk7XG4gICAgfSk7XG5cblxufSk7Il19

// $(document).ready(function () {
//     var e = document.getElementById("scene");
//     new Parallax(e, {relativeInput: !0});
//     $(".modal__close a").on("click", function () {
//         $(".modal").fadeOut(), $(".modal_bl").removeClass("modal_bl__over")
//     }), $(".modal_bl").on("click", function () {
//         $(".modal").fadeOut(), $(this).removeClass("modal_bl__over")
//     })
// });

var dragged; // Keeps track of what's being dragged - we'll use this later!

function onDragStart(event) {
    var target = event.target;
    if (target && target.nodeName === 'IMG') { // If target is an image
        dragged = target;
        event.dataTransfer.setData('text', target.id);
        event.dataTransfer.dropEffect = 'copy';
        // Make it half transparent when it's being dragged
        event.target.style.opacity = 1;
    }
}

function onDragEnd(event) {
    if (event.target && event.target.nodeName === 'IMG') {

        // Reset the transparency
        event.target.style.opacity = 1; // Reset opacity when dragging ends
        // dragged = null;
    }
}

// // Adding event listeners
const vehicles = document.querySelector('.meals');
vehicles.addEventListener('dragstart', onDragStart);
vehicles.addEventListener('dragend', onDragEnd);


function onDragOver(event) {
    // Prevent default to allow drop
    event.preventDefault();
}

function onDragLeave(event) {
    event.target.style.background = '';
}

function onDragEnter(event) {
    const target = event.target;
    if (dragged && target) {
        event.preventDefault();
        var check = canMeal(dragged, target);
        // console.log('check');
        // console.log(check);
        if (check) {
            // Set the dropEffect to move
            event.dataTransfer.dropEffect = 'copy';
            /* Change color to green to show it can be dropped */
            target.style.background = '#1f904e';
        } else {
            /* Change color to red to show it can't be dropped. Notice we
             * don't call event.preventDefault() here so the browser won't
             * allow a drop by default
             */
            target.style.backgroundColor = '#FA5555';

        }
    }
}

function canMeal(dragged, target) {

    var input = target.querySelector('input');
    var img = dragged;

    if (input != null && input.checked && img) {
        return false;
    } else if (img != null && img.getAttribute('data-limit') < 1 && img.id == 'joker'){
        return false;
    }

    return true;
}

function onDrop(event) {
    const target = event.target;
    if (target) {
        target.style.backgroundColor = '';
        event.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM

        if (canMeal(dragged, target)) {
            // console.log(dragged);
            dragged.style.opacity = 1;
            target.appendChild(dragged.cloneNode(true));

            var input = target.querySelector('input');
            input.checked = true;
            input.value = dragged.id;
            input.setAttribute('checked', 'checked');
            if (dragged != null && dragged.getAttribute('data-limit') > 0 && dragged.id == 'joker'){
                var artrLimit = dragged.getAttribute('data-limit');
                artrLimit -=1;
                dragged.setAttribute('data-limit', artrLimit);
            }
        }

    }
}

function onCheckboxClick(event) {
    var input = event.target;
    var img = event.target.parentNode.querySelector('img');

    if (!input.checked && input.value && img){
        input.value = '';
        input.removeAttribute('checked');
        var oldImg = document.getElementById(img.id);

        if (oldImg != null && oldImg.getAttribute('data-limit') >= 0  && oldImg.getAttribute('data-limit') <= oldImg.getAttribute('data-const-limit') && oldImg.id == 'joker'){
            var artrLimit = parseInt(oldImg.getAttribute('data-limit'));
            artrLimit +=1;
            oldImg.setAttribute('data-limit', artrLimit);
        }
        event.target.parentNode.removeChild(img);

    }
}

for (var
         dropZones = document.querySelectorAll('.drop-zone'),
         len = dropZones.length,
         i = 0; i < len; i++) {
    dropZones[i].addEventListener('drop', onDrop);
    dropZones[i].addEventListener('dragenter', onDragEnter);
    dropZones[i].addEventListener('dragleave', onDragLeave);
    dropZones[i].addEventListener('dragover', onDragOver);
}

for (var
         dropZonesCheckboxes = document.querySelectorAll('.drop-zone_checkbox'),
         len = dropZonesCheckboxes.length,
         i = 0; i < len; i++) {
    dropZonesCheckboxes[i].addEventListener('click', onCheckboxClick);

}

$(document).ready(function () {
    var a = document.getElementById("scene");
    new Parallax(a, {relativeInput: !0});
    $(".modal__close a").on("click", function () {
        $(".modal").fadeOut(), $(".modal_bl").removeClass("modal_bl__over")
    }), $(".modal_bl").on("click", function () {
        $(".modal").fadeOut(), $(this).removeClass("modal_bl__over")
    })
});
