$(document).ready(function() {
    if(localStorage.getItem('myPlan')) {
        let savedPlan = localStorage.getItem('myPlan');

        $('#user-status').html('<i class="fas fa-check-circle"></i> ' + savedPlan);
    }

    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('sticky');
        } else {
            $('.header').removeClass('sticky');
        }
    });

    $('.menu-btn').click(function() {
        $(this).find('i').toggleClass('fa-bars fa-times');
        $('.navbar').slideToggle();
    });

    $('.tab-btn').click(function() {
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        let target = $(this).data('target');
        $('.tab-content').hide();
        $('#' + target).css('display', 'flex').hide().fadeIn(400); 
    });

    $('#calc-btn').click(function() {
        let weight = parseFloat($('#weight').val());
        let height = parseFloat($('#height').val());
        let age = parseFloat($('#age').val());
        let goal = $('#goal').val();

        if(weight && height && age) {
            let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            let calories = 0;

            if (goal === 'lose') calories = bmr * 1.2 - 300;
            else if (goal === 'maintain') calories = bmr * 1.2;
            else if (goal === 'gain') calories = bmr * 1.2 + 400;

            calories = Math.round(calories);

            $('#calories').text(calories);
            $('#calc-result').slideDown();


            let planText = '';
            if (calories < 1500) planText = 'Light (1200 kcal)';
            else if (calories > 2500) planText = 'Power (2800 kcal)';
            else planText = 'Balance (2000 kcal)';
            
            $('#recommended-plan').text(planText);

        } else {
            alert('Please fill in all fields!');
        }
    });

    $('.subscribe-btn').click(function() {
        let planName = $(this).data('plan');
        localStorage.setItem('myPlan', planName);

        $('#selected-plan-name').text(planName).css('color', '#27ae60').css('font-weight', 'bold');
        $('#order-modal').css('display', 'flex').hide().fadeIn();
        

        $('#user-status').html('<i class="fas fa-check-circle"></i> ' + planName);
    });

    $('.close-btn, .close-modal-action').click(function() {
        $('#order-modal').fadeOut();
    });

    $(window).click(function(e) {
        if ($(e.target).is('#order-modal')) {
            $('#order-modal').fadeOut();
        }
    });
});