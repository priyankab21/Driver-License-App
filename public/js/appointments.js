$(document).ready(function(){
    $("#dateValue").on("change", function(){
      const allAppointmentstime = [{time: "9:00", disabled: false}, {time: "9:30", disabled: false},{time: "10:00", disabled: false},{time: "10:30", disabled: false},{time: "11:00", disabled: false},{time: "11:30", disabled: false},{time: "12:00", disabled: false},{time: "12:30", disabled: false},{time: "1:00", disabled: false},{time: "1:30", disabled: false},{time: "2:00", disabled: false}]
        const bookedTime = JSON.parse(document.getElementById("hiddenDateValue").value);
        const indexes = [];
        $('#time'). empty();
        console.log(bookedTime, 'bookedTime')
        if(bookedTime.length === 0) {
          $.each(allAppointmentstime, function (i, item) {
            $('#time').append($('<option>', { 
                value: item.time,
                text: item.time,
                disabled : false
            }));
          }); 
        }
        bookedTime.map((data, index) => {
          const month = new Date(data.date).getMonth()+1;
          let date = new Date(data.date).getDate()+1;
          if(date <= 9) {
            date = "0" + date;
          }
          const combinedDate = (new Date(data.date).getFullYear() + "-" + month + "-" +date).toString();
          if(document.getElementById("dateValue").value === combinedDate) {
            allAppointmentstime.map((duplicateData, i) => {
              if(data.time === duplicateData.time) {
                indexes.push(i);
              }
            })
            if(indexes.length === 0) {
              $.each(allAppointmentstime, function (i, item) {
                $('#time').append($('<option>', { 
                    value: item.time,
                    text: item.time,
                    disabled : false
                }));
              }); 
            } else {
              if(bookedTime.length === index + 1){
                console.log('in')
            $.each(allAppointmentstime, function (i, item) {
              $('#time').append($('<option>', { 
                  value: item.time,
                  text: item.time,
                  disabled : indexes.includes(i) ? true : item.disabled 
              }));
          });
        }
        }
          } else {
            if(bookedTime.length === index + 1){
            $.each(allAppointmentstime, function (i, item) {
              $('#time').append($('<option>', { 
                  value: item.time,
                  text: item.time,
                  disabled : false
              }));
            });
          }
        }
        })
    });
    $("#dateValueG2").on("change", function() {
      $('#g2time').empty();
      $('#g2time').append($('<option>', { 
        value: '',
        text: ''
    }));
      const selectedDate = document.getElementById("dateValueG2").value;
      const availableDates = JSON.parse(document.getElementById("hiddenDateValueG2").value);
      const filteredDates = [];
      availableDates.map(data => {
        const month = new Date(data.date).getMonth()+1;
        let date = new Date(data.date).getDate()+1;
        if(date <= 9) {
          date = "0" + date;
        }
        const combinedDate = (new Date(data.date).getFullYear() + "-" + month + "-" +date).toString();
        if(selectedDate === combinedDate) {
          filteredDates.push(data);
        }
      })
      $.each(filteredDates, function (i, item) {
        $('#g2time').append($('<option>', { 
            value: item.time,
            text: item.time
        }));
      });
    })
    $("#g2time").on("change", function() {
      const selectedTime = document.getElementById("g2time").value;
      const selectedDate = document.getElementById("dateValueG2").value;
      const availableDates = JSON.parse(document.getElementById("hiddenDateValueG2").value);
      availableDates.map(data => {
        const month = new Date(data.date).getMonth()+1;
        let date = new Date(data.date).getDate()+1;
        if(date <= 9) {
          date = "0" + date;
        }
        const combinedDate = (new Date(data.date).getFullYear() + "-" + month + "-" +date).toString();
        console.log(selectedDate, combinedDate, selectedTime, data.time, 'selectedTime')
        if(selectedDate === combinedDate && selectedTime === data.time) {
          document.getElementById("hiddenG2Time").value = data._id;
          console.log(document.getElementById("hiddenG2Time").value, 'data')
        }
      })
    })
  });