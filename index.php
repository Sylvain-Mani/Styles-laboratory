<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/style-index.css" />
  <title>Document</title>
</head>

<body>
  <!-- <div class="menu">
    <button onclick="loadHtml('dropdown2')">Load</button>
  </div> -->

  <div class="target">
      <iframe src="" frameborder="0"></iframe>

  </div>

  <?php
  $data = create_tree();
  // test('js', 'apps.js');
  ?>

  <script>
    let tree = <?php echo $data ?>
  </script>
  <script src="./js/app.js"></script>
  <script src="./js/menu.js"></script>

</body>

</html>


<?php
function create_tree()
{
  $dir = './view/';
  $dirHandle = opendir($dir);
  while (false !== ($subDir = readdir($dirHandle))) {
    if (!in_array($subDir, array(".", "..")) && filetype($dir . $subDir) == 'dir') {
      $files = [];
      $subHandle = opendir($dir . $subDir);
      while (false !== ($file = readdir($subHandle))) {
        if (!in_array($file, array(".", "..")) && filetype($dir . $subDir . DIRECTORY_SEPARATOR . $file) == 'file') {

          // ! not iterable (donc pas utilisable avec for ou foreach)
          // $files[pathinfo($file)['filename']] = [
          $files[] = [
            'filename' => $file,
            'path' => $subDir,
            'title' => get_titleHtml($dir . $subDir . DIRECTORY_SEPARATOR . $file),
          ];
          // test(pathinfo($file)['dirname'], pathinfo($file)['filename']);
          // * creation des fichiers si ils n'existent pas
          // create_file($subDir, pathinfo($file)['filename']);
        }
      }
      if ($files !== []) {
        $tree[] = ['dirname' => $subDir, 'content' => $files];
      }
    }
  }
  $res = json_encode($tree);
  return $res;
}

function get_titleHtml($filePath)
{
  $html = new DOMDocument();
  @$html->loadHtmlFile($filePath);
  $titleNode = $html->getElementsByTagName('title')->item(0);
  $fileTitle = (!isset($titleNode)) ? 'Sans titre' : $titleNode->textContent;
  return $fileTitle;
}

function create_file($subDir, $file)
{
  $filename = 'css/' . $subDir . '/' . $file . '.css';
  if (!file_exists($filename)) {
    echo "<span>Le fichier $filename n'existe pas. </span>";
    if (!file_exists('css/' . $subDir)) {
      mkdir('css/' . $subDir);
    } else {
      $stream = fopen($filename, 'c');
      fclose($stream);

    }
  }

  $filename = 'js/' . $subDir . '/' . $file . '.js';
  if (!file_exists($filename)) {
    echo "<span>Le fichier $filename n'existe pas. </span>";
    if (!file_exists('js/' . $subDir)) {
      mkdir('js/' . $subDir);
    } else {
      $stream = fopen($filename, 'c');
      fclose($stream);
    }
  }
}

?>