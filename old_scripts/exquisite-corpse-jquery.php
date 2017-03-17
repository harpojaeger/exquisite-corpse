<div class="exquisite_corpse" style="display:block;">
<script language="javascript" type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script language="javascript" type="text/javascript" src="exquisite_corpse_assets/script.js"></script>
<script language="javascript" type="text/javascript" src="exquisite_corpse_assets/iframeResizer.contentWindow.min.js"></script>
<script type="text/javascript">
	$(function () {
	console.debug("iframe domain: "+document.domain);
		var iframeOffset = $("#ecframe", window.parent.document).offset();
        $("a").each(function () {
            var link = $(this);
            var href = link.attr("href");
            if (href && href[0] == "#") {
                var name = href.substring(1);
                $(this).click(function () {
                    var nameElement = $("[name='" + name + "']");
                    var idElement = $("#" + name);
                    var element = null;
                    if (nameElement.length > 0) {
                        element = nameElement;
                    } else if (idElement.length > 0) {
                        element = idElement;
                    }

                    if (element) {
                        var offset = element.offset();
                        window.parent.scrollTo(offset.left, offset.top + iframeOffset.top);
                    }

                    return false;
                });
            }
        });
	});
	</script>
<span id="already_poems">write the <span id="numlines"></span> (or last) line of this poem&nbsp;(<a href="javascript:;" id="skiplink">or get a different one</a>)<br>
<div id="promptline"></div><form id="editform" action="javascript:;"><input type="text" name="submission" id="submission" class="text"/><button type="button" class="button" id="add">add</button><button type="button" class="button" id="end">end</button><img src="exquisite_corpse_assets/ajax-loader.gif" alt="ajax-loader" id="editloader" width="" height="" class="loader"/><input type="hidden" name="id" id="hidden_prompt_id"/></form>or </span>start a new poem
<form id="createform" action="javascript:;"><input type="text" name="newsubmission" id="newsubmission" class="text"/><button type="button" class="button" id="start">start</button><img src="exquisite_corpse_assets/ajax-loader.gif" alt="ajax-loader" width="" height="" class="loader" id="createloader"/></form>

curently there <span id="are_is">are</span> <span id="num_open_poems"></span> open poem<span id="s">s</span> and <span id="num_completed_poems"></span> completed poems.
<h3>what is this?</h3>
<p>This is an electronic version of the <a href="http://en.wikipedia.org/wiki/Exquisite_corpse" target="_blank">Surrealist parlor game Exquisite Corpse</a>, in which players write a communal poem by each contributing one line, having seen only the one that comes directly before.&nbsp;&nbsp;<a href="http://jonrendell.com/" target="_blank">Jon Rendell</a> has some <a href="http://jonrendell.com/definition/About.html" target="_blank">more interesting information about the origins of the game</a>.&nbsp;&nbsp;Also, <a href="http://www.artandculture.com/users/2570-danielle-ezzo#Blog" target="_blank">Danielle Ezzo</a> runs Exquisite Corpse-themed dinners in NYC.&nbsp;&nbsp;One of these days I'm planning to go to one.&nbsp;&nbsp;Maybe I'll see you there?</p>
<h3>how do i use it?</h3>
<p>See the <strong>bold</strong> text?&nbsp;&nbsp;That's the most recent line of one of the currently in-progress poems.&nbsp;&nbsp;Write whatever you think should come next in the first box (be creative!) and click "add."&nbsp;&nbsp;If you think your line should be the last, click "end" instead (or leave the box blank to make the displayed line the last).&nbsp;&nbsp;The second box lets you start a brand new poem.</p>

<h3>completed poems (most recent at the top)</h3><p>jump to poem #<span id="poem_navigation"></span><br><span id="completed_poems"></span>
</p><h3>fine print</h3>
<p>Everything submitted here is available to the public according to the <a href=\"http://www.gnu.org/licenses/gpl-3.0.txt\" target=\"_blank\">GNU GPL</a>.&nbsp;&nbsp;If you don't have the right to distribute something or you don't want it made publicly available, don't submit it.</p>
<p>Since anyone can contribute to this page, I'm not responsible for its content.&nbsp;&nbsp;I try to remove things that I think are blatantly inappropriate, but I offer no guarantees on what I will or won't take down.&nbsp;&nbsp;However, if you see something that you believe is spam or copyright-protected, please let me know using the contact form.</p>


</div>
