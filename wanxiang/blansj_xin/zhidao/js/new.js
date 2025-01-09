$(document).ready(function(){
    $('.put_problem').mousemove(function(){
	$(this).find('.put_problem_tit').show();
	});
	$('.put_problem').mouseleave(function(){
	$(this).find('.put_problem_tit').hide();
	});
});

$(document).ready(function(){
    $('.sidelist1').mousemove(function(){
	$(this).find('.i-list1').show();
	$(this).find('h3').addClass('hover');
	});
	$('.sidelist1').mouseleave(function(){
	$(this).find('.i-list1').hide();
	$(this).find('h3').removeClass('hover');
	});
});



