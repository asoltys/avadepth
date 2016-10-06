/**
 * Created by wsiddall on 26/08/2014.
 */


if (!(typeof avaIFaceJS === 'undefined')) {

    /*** Interface functions ***/
    avaIFaceJS.tw_func = {
        table: null,

        init: function() {
            $('#date').change(function() {
                avadepth.util.getFlow({
                    date: $(this).val(),
                    selected: $("#selected_discharge"),
                    actual: $("#actual_discharge")
                });
            }).datepicker().datepicker('setDate', new Date()).change();


            $('#period').change(function() {
                var period = (function() {
                    switch ($('#period').val()) {
                        case '0':
                            return 'd';
                        case '1':
                            return 'w';
                        case '2':
                            return 'M';
                    }
                })();
            });

            $('#selected_discharge').change(function() {
                return $('#selected_radio').prop('checked', true).change();
            });
            // Check "User Defined" radio on "User Defined" input is focused on
            $('#defined_discharge').on("click", function() {
                $('#defined_radio').prop('checked', true).change();
            });

            $('#compliance').change(function() {
                $('#cmp_box').val(0);
                if ($('#compliance').is(':checked')) {
                    return $('input[name="cmp_box"]').attr('disabled', false);
                } else {
                    $('input[name="cmp_box"]').attr('disabled', true);
                    return $('input[name=cmp_box]').change(function() {
                        return $('#cmp_box').val();
                    });
                }
            });
            $('#minimum_window').change(function() {
                $('#max_depth_radio').prop('checked', 'checked');
                $('#window').val($(this).val());
                $('#cmp').val(0);
                return $('#static-window').text("" + ($('#window').val()));
            });
            $('#depth').change(function() {
                $('#min_win_radio').prop('checked', 'checked');
                $('#cmp').val($(this).val());
                return $('input[name="window_radio"]').change();
            });

            // default Current Soundings
            $("#date").datepicker("option", "minDate", 0);
            // $('input[type=radio][name=condition]').change(function() {
            //     if (this.value == '0') {
            //         $("#date").datepicker("option", "minDate", 0);
            //     }
            //     else if (this.value == '1') {
            //         $("#date").datepicker("option", "minDate", null);
            //     }
            // });

            return $('#submit').click(function() {
                // user has left user-defined m^3/s value blank
                if (avadepth.util.getSelectedFlow().flowRate === "" && avadepth.util.getSelectedFlow().flowType === 'UserDefined') {
                    $('#defined_discharge').focus();
                    return;
                } else {
                    $('.spinner').show();
                    return avaIFaceJS.tw_func.update();
                }
            });
        },

        update: function() {
            var flow, dt, period;
            var tableStruct = {
                maxDepth: [{
                    tag: 'tr',
                    child: [{
                        tag: 'td',
                        attr: {
                            width: "40%",
                            id: "num_days_selected"
                        },
                        child: ["Number of Days with Selected Window:"]
                    }, {
                        tag: 'td',
                        child: [{
                            tag: 'span',
                            attr: {
                                id: 'num_days'
                            },
                            child: ["-"]
                        }]
                    }]
                },{
                    tag: 'tr',
                    child: [{
                        tag: 'td',
                        attr: {
                            width: "40%",
                            id: "avg_depth_selected"
                        },
                        child: ["Average Depth of Selected Window:"]
                    }, {
                        tag: 'td',
                        child: [{
                            tag: 'span',
                            attr: {
                                id: 'avg_depth'
                            },
                            child: ["-"]
                        }]
                    }]
                },{
                    tag: 'tr',
                    child: [{
                        tag: 'td',
                        attr: {
                            width: "40%",
                            id: "min_depth_selected"
                        },
                        child: ["Minimum Depth (m):"]
                    }, {
                        tag: 'td',
                        child: [{
                            tag: 'span',
                            attr: {
                                id: 'min_depth'
                            },
                            child: ["-"]
                        }]
                    }]
                },{
                    tag: 'tr',
                    child: [{
                        tag: 'td',
                        attr: {
                            width: "40%",
                            id: "max_depth_selected"
                        },
                        child: ["Maximum Depth (m):"]
                    }, {
                        tag: 'td',
                        child: [{
                            tag: 'span',
                            attr: {
                                id: 'max_depth'
                            },
                            child: ["-"]
                        }]
                    }]
                }],
                availWindow: [{
                    tag: 'tr',
                    child: [{
                        tag: 'td',
                        attr: {
                            width: "40%",
                            id: "total_hours_avail"
                        },
                        child: ["Total hours meeting standard:"]
                    }, {
                        tag: 'td',
                        child: [{
                            tag: 'span',
                            attr: {
                                id: 'total_hr'
                            },
                            child: ["-"]
                        }]
                    }]
                },{ 
                    tag: 'tr',
                    child: [{
                        tag: 'td',
                        attr: {
                            width: "40%",
                            id: "avg_hours_avail"
                        },
                        child: ["Average hours per day meeting standard:"]
                    }, {
                        tag: 'td',
                        child: [{
                            tag: 'span',
                            attr: {
                                id: 'avg_hr'
                            },
                            child: ["-"]
                        }]
                    }]
                },{
                    tag: 'tr',
                    child: [{
                        tag: 'td',
                        attr: {
                            width: "40%",
                            id: "num_days_avail"
                        },
                        child: ["Number of days meeting standard:"]
                    }, {
                        tag: 'td',
                        child: [{
                            tag: 'span',
                            attr: {
                                id: 'num_days_meeting_standard'
                            },
                            child: ["-"]
                        }]
                    }]
                }]
            };

            flow = avadepth.util.getSelectedFlow();
            $("#flowRate").val(flow.flowRate);
            $('#flowType').val(flow.flowType);

            dt = $('#date').val();
            period = function() {
                switch ($('#period').val()) {
                    case "0":
                        return 1;
                    case "1":
                        return 7;
                    case "2":
                        var cd = $('#date').datepicker('getDate');
                        return new Date(cd.getFullYear(), cd.getMonth(), 0).getDate();
                }

            }();

            if (window.location.href.indexOf("fra") > -1) {
                moment.locale('fr');
            } else {
                moment.locale('en');
            }

            if ($('input[name="window_radio"]:checked').val() == 'Maximum Depth') {
                $('#header_table').html('').append(avaIFaceJS.getElements(tableStruct.maxDepth));
                $('#cmp').val(0);
                if (window.location.href.indexOf("fra") > -1) { //If url contains 'fra' use 
                    moment.locale('fr');
                    avaIFaceJS.reportWindow.title1 = 'Profondeur maximum pour la fenêtre de ' + $('#window').val() + ' heures';
                    avaIFaceJS.reportWindow.title2 = "de " + moment(dt).format("MMMM DD, YYYY") + " à " + moment(dt).add(period, 'days').format("MMMM DD, YYYY");
                    $('#transit-window-last-col').text('profondeur maximum (m)');
                    $('#num_days_selected').text('Nombre de jours avec la fenêtre sélectionnée:');
                    $('#avg_depth_selected').text('Profondeur moyenne de la fenêtre sélectionnée:');
                    $('#min_depth_selected').text('Profondeur minimum (m):');
                    $('#max_depth_selected').text('Profondeur maximum (m):');
                } else { //If url does not contain 'fra' use
                    moment.locale('en');
                    avaIFaceJS.reportWindow.title1 = 'Maximum Depth for ' + $('#window').val() + ' hr. Transit Window';
                    avaIFaceJS.reportWindow.title2 = "From " + moment(dt).format("MMMM DD, YYYY") + " to " + moment(dt).add(period, 'days').format("MMMM DD, YYYY");
                    $('#transit-window-last-col').text('Maximum Depth (m)');
                    $('#num_days_selected').text('Number of Days with Selected Window:');
                    $('#avg_depth_selected').text('Average Depth of Selected Window:');
                    $('#min_depth_selected').text('Minimum Depth (m):');
                    $('#max_depth_selected').text('Maximum Depth (m):');
                }
            } else {
                $('#header_table').html('').append(avaIFaceJS.getElements(tableStruct.availWindow));
                $('#cmp').val($('#depth').val());
                if (window.location.href.indexOf("fra") > -1) { //If url contains 'fra' use 
                    moment.locale('fr');
                    avaIFaceJS.reportWindow.title1 = 'Available Transit Window for ' + $('#cmp').val() + ' m depth';
                    avaIFaceJS.reportWindow.title2 = "de " + moment(dt).format("MMMM DD, YYYY") + " à " + moment(dt).add(period, 'days').format("MMMM DD, YYYY");
                    $('#transit-window-last-col').text('heures (h)');
                    $('#total_hours_avail').text('Nombre d’heures standard de réunion:');
                    $('#avg_hours_avail').text('Heures moyennes par type de réunion d’une journée:');
                    $('#num_days_avail').text('Nombre de jours de réunion standard:');
                } else { //If url does not contain 'fra' use
                    moment.locale('en');
                    avaIFaceJS.reportWindow.title1 = 'Available Transit Window for ' + $('#cmp').val() + 'm depth';
                    avaIFaceJS.reportWindow.title2 = "From " + moment(dt).format("MMMM DD, YYYY") + " to " + moment(dt).add(period, 'days').format("MMMM DD, YYYY");
                    $('#transit-window-last-col').text('Transit Window (hrs)');
                    $('#total_hours_avail').text('Total hours meeting standard:');
                    $('#avg_hours_avail').text('Average hours per day meeting standard:');
                    $('#num_days_avail').text('Number of days meeting standard:');
                }
            }

            // Adding subtitles
            // TODO: French Translation
            var subTitle1, subTitle2;
            if (window.location.href.indexOf("fra") > -1) {
              subTitle1 = "Chenal navigation: Fleuve Fraser - "
                          + $('input[name="channel"]:checked').next().text()
                          + "\n"
                          + "Condition du chenal: "
                          + $('input[name="sounding"]:checked').next().text()
                          + " pour Km 1 à Km "
                          + $('select#chainage').val()
                          + " à "
                          + $('select#width').val()
                          + "% largeur disponible";
              subTitle2 = "Rivière décharge @ Hope "
                          + flow.flowRate
                          + " m\u00B3/s (" 
                          + translate_flow()
                          + ")";
            } else {
              subTitle1 = "Navigation Channel: Fraser River - "
                          + $('input[name="channel"]:checked').next().text()
                          + "\n"
                          + "Channel Condition: "
                          + $('input[name="sounding"]:checked').next().text()
                          + " for Km 1 to Km "
                          + $('select#chainage').val()
                          + " at "
                          + $('select#width').val()
                          + "% Available Width";
              subTitle2 = "River Discharge @ Hope "
                          + flow.flowRate
                          + " m\u00B3/s (" 
                          + translate_flow()
                          + ")";
            }
            avaIFaceJS.reportWindow.addTitle(undefined, undefined, subTitle1, subTitle2);


            ///////

            // $('#static-discharge').text(flow.flowRate);
            // $('#static-discharge-eval').text(translate_flow());
            // if ($('html').attr('lang') === 'fr') {
            //     flowRate_txt = (function() {
            //         switch ($(this).val()) {
            //             case 'Actual':
            //                 return "réel";
            //             case 'Defined':
            //                 return "défini par l'utilisateur";
            //             case 'Selected':
            //                 return "choisi";
            //         }
            //     }).call(this);
            //     $("#static-discharge-eval").text(flowRate_txt);
            // }

            // $('#static-sounding').text($('input[name="sounding"]:checked').next().text());
            // $('#static-width').text($('select#width').val());
            // $('#static-chainage').text($('select#chainage').val());
            $('#static-window').text($('#window').val());

            //TODO: Change to following line for production
            return $.getJSON(getAPI(("api/transit?date=" + ($('#date').val()) + "&") + ("lane=" + ($('input[name=channel]:checked').val()) + "&") + ("window=" + ($('#window').val()) + "&") + ("cmp=" + ($('#cmp').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("periodType=" + ($('#period').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("width=" + ($('#width').val()) + "&") + ("sounding=" + ($('input[name=sounding]:checked').val())), "api/depths/transit.json"), function(data2) {
                var item, limit_text, num_days_meeting_standard, total_hr, _i, _len, _ref;

                $('#num_days').text(data2.statistics.numberOfDays);
                $('#min_depth').text(data2.statistics.minimumDepth.toFixed(2));
                $('#max_depth').text(data2.statistics.maximumDepth.toFixed(2));
                $('#avg_depth').text(data2.statistics.totalWindow.toFixed(2));
                
                avaIFaceJS.tw_func.table || (avaIFaceJS.tw_func.table = $('#transit-window').DataTable({
                    bPaginate: false,
                    ordering: false,
                    bInfo: false,
                    bFilter: false,
                    aaSorting: [],
                    asStripeClasses: []
                }));
                avaIFaceJS.tw_func.table.clear();
                _ref = data2.items;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    item = _ref[_i];
                    var from = item.startTime + " " + item.windowStart;
                    var to = item.endTime + " " + item.windowEnd;
                    avaIFaceJS.tw_func.table.row.add([from, to, item.depth]);
                }
                $("#transit-window th").css("cursor", "default");
                $('#transit-window tbody td').css('text-align', 'center');
                //avaIFaceJS.tw_func.table.fnAdjustColumnSizing();
                avaIFaceJS.tw_func.table.draw();
                limit_text = (function() {
                    switch (false) {
                        case $('input[name="channel"]:checked').val() !== '2':
                            if ($('html').attr('lang') === 'en') {
                                return 'Outer Channel Limit';
                            } else {
                                return 'Limite extérieure';
                            }
                            break;
                        case $('input[name="channel"]:checked').val() !== '1':
                            if (window.location.href.indexOf("eng") > -1) {
                                return 'Inner Channel Limit';
                            } else {
                                return 'Limite intérieure';
                            }
                            break;
                        default:
                            return '';
                    }
                })();
                $('#static-channel').text(limit_text);
                total_hr = 0;
                num_days_meeting_standard = $('#transit-window tbody tr').length;
                $('#transit-window tbody tr td:last-child').each(function() {
                    var my_val;
                    my_val = $(this).text();
                    return total_hr += parseFloat(my_val);
                });
                if (isNaN(total_hr)) { // table data does not exist
                    $('#total_hr').text("---");
                    $('#avg_hr').text("---");
                } else {
                    $('#total_hr').text(total_hr);
                    $('#avg_hr').text(Math.round(total_hr / num_days_meeting_standard * 100) / 100);
                }

                if ($('html').attr('lang') === 'en') {
                    $(".dataTables_empty").text("Specified depth not available");
                } else {
                    $(".dataTables_empty").text("Profondeur spécifiée pas disponible");
                }

                return $('#num_days_meeting_standard').text(num_days_meeting_standard);
            }).success(function() {
                $('.spinner').hide();
                pBarToggle();
                avaIFaceJS.reportWindow.setTitle();
                $("#reportSubT1").css("white-space", "pre-line");
                avaIFaceJS.setMapOpen(avaIFaceJS.MapState.Close);
                return avaIFaceJS.reportWindow.show();
            }).error(function() {
                $('.spinner').hide();
                avaIFaceJS.reportWindow.show();
                avaIFaceJS.setMapOpen(avaIFaceJS.MapState.Close);
                return avaIFaceJS.reportWindow.showError('An error occured while retrieving your results');
            });
        }
    }
} else if (!(typeof avaMapJS === 'undefined')) {

    /*** Map Interaction functions ***/

    avaMapJS.tw_func = {
        init: function() {}
    }
} else if (!(typeof avaMapDetJS === 'undefined')) {
    avaMapDetJS.tw_func = {
        init: function() {}
    };
}

//# sourceURL=tw_func.js