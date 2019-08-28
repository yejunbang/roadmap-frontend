{
  // Place your snippets for html here. Each snippet is defined under a snippet name and has a prefix, body and 
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
  // same ids are connected.
  // Example:
  // "Print to console": {
  // 	"prefix": "log",
  // 	"body": [
  // 		"console.log('$1');",
  // 		"$2"
  // 	],
  // 	"description": "Log output to console"
  // }
  "html": {
    "prefix": "<ht",
    "body": [
      "<!DOCTYPE html>",
      "<html lang=\"en\">",
      "",
      "<head>",
      "    <meta charset=\"UTF-8\">",
      "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
      "    <title>$1</title>",
      "    <style>",
      "",
      "    </style>",
      "</head>",
      "",
      "<body>",
      "    $2",
      "    <script>",
      "",
      "    </script>",
      "</body>",
      "",
      "</html>",
    ]
  },
  "vue": {
    "prefix": "<vue",
    "body": [
      "<!DOCTYPE html>",
      "<html lang=\"en\">",
      "",
      "<head>",
      "    <meta charset=\"UTF-8\">",
      "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
      "    <title>$0</title>",
      "    <script type=\"text/javascript\" src=\"https://unpkg.com/vue\"></script>",
      "    <style>",
      "",
      "    </style>",
      "</head>",
      "",
      "<body>",
      "    <div id=\"app\">",
      "     $1",
      "    </div>",
      "    <script>",
      "        var vm=new Vue({",
      "           el:'#app',",
      "           data:{},",
      "           methods:{}",
      "        });",
      "    </script>",
      "</body>",
      "",
      "</html>",
    ]
  }
}