var avadepth = avadepth || {};

avadepth.util = avadepth.util || {};

avadepth.util = {
    getFlow: function (options, callback) {
        var thisCallback = callback;

        $.getJSON(getAPI('/api/depths?date=' + options.date,'api/depths/depths.json'), function(data){

            selectList = $(options.selected);

            var s = '';
            $.each(data.Flowrates, function (idx, itm) {
                s += '<option value=' + itm + '>' + itm + '</option>';
            });

            $('option', selectList).remove()
            selectList.append(s);

            $(options.predicted).text(data.Predicted);
            $(options.actual).text(data.Actual);

            if (data.Actual) {
              $("#actual_radio").attr('disabled', false);
              $("#predicted_radio").attr('disabled', true);
              $('#actual_radio').prop('checked', true);
            } else {
              $("#actual_radio").attr('disabled', true);
              $("#predicted_radio").attr('disabled', false);
              $("#predicted_radio").prop('checked', true);
            }

            if (thisCallback) { callback(data); };
            return data.Predicted;
        });
    },
    getSelectedFlow: function () {
        var flow = { flowRate: 0, flowType: $("input:radio[name=discharge]:checked").val() };

        getFlowRate = {
          Predicted: function (){
            return $('#predicted_discharge').text();
          },
          Actual: function() {
            return $('#actual_discharge').text();
          },
          Defined: function() {
            return $('#defined_discharge').val();
          },
          Selected: function() {
            return $('#selected_discharge').val();
          }
        }

        flow.flowRate = getFlowRate[flow.flowType]();
        if (flow.flowType == "Defined"){
          flow.flowType = "0"
        }
        return flow;
    }
}
