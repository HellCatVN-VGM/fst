		$(document).ready(function() {
			var access_token, id, message, delay, btn;
			$("#btn").click(function() {
				btn = $(this), access_token = $.trim($("#access_token").val()).split("\n"), id = $("#id").val(), message = $("#message").val(), delay = parseInt($("#delay").val());
				btn.button('loading');
				start_send(0);
			});
			function start_send(i) {
				$.post('https://graph.facebook.com/v2.8/me/threads', {
					to: `[{"type":"id","id":"${id}"}]`,
					message: spinText(message),
					access_token: access_token[i]
				}).done(function() {
					$("#done").text(parseInt($("#done").text()) + 1);
					$("#status").html(`<font color="green">Access Token số ${i + 1} gửi thành công ! <img src="https://i.imgsafe.org/203831a28f.gif" /></font>`);
				}).error(function() {
					$("#fail").text(parseInt($("#fail").text()) + 1);
					$("#status").html(`<font color="red">Access Token số ${i + 1} gửi thất bại ! <img src="https://i.imgsafe.org/203831a28f.gif" /></font>`);
				}).always(function() {
					if (i + 1 < access_token.length) {
						setTimeout(function() {
							start_send(i + 1);
						}, Math.floor(Math.random() * (200 - 60 + 1) + 60) * 1000);
					} else {
						btn.button('reset');
						$("#status").html('Đã gửi xong !');
					}
				});
			}
			function spinText(text) {
				var matches = text.match(/{([^{}]*)}/g);
				if (!matches)
					return text;
				for (i in matches) {
					var spin      = matches[i];
					var ori_spin  = spin;
					spin          = spin.replace("{", "").replace("}", "");
					var spin_strs = spin.split('|');
					text          = text.replace(ori_spin, spin_strs[Math.floor(Math.random() * spin_strs.length)]);
				}
				return spinText(text);
			}
		});