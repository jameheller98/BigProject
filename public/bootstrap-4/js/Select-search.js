$('#select2').prop('disabled', true);
$('#select3').prop('disabled', true);
// select1
$('#select1').click(function() {
  const select1 = $('#select1').val();

  if (select1 != 'select1') {
    $('#select2').prop('disabled', false);
    $('#select3').prop('disabled', false);
  } else if (select1 == 'select1') {
    $('#select2').prop('disabled', true);
    $('#select3').prop('disabled', true);
  }
});
$('#select2').click(function() {
  const select2 = $('#select2').val();
  if (select2 != 'billion') {
    $('#select3').prop('disabled', true);
  } else if (select2 == 'billion') {
    $('#select3').prop('disabled', false);
  }
});
$('#select3').click(function() {
  const select3 = $('#select3').val();
  if (select3 != 'million') {
    $('#select2').prop('disabled', true);
  } else if (select3 == 'million') {
    $('#select2').prop('disabled', false);
  }
});
