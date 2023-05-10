<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/styles.css">
  <title>Laboratoire de styles CSS</title>
</head>

<body>
  <?php
  $dir    = './view';
  $cdir = scandir($dir);
  // print_r($cdir);

  $count = 0;

  foreach ($cdir as $key => $folder) {

    if (!in_array($folder, array(".", ".."))) {

      if (is_dir($dir . "/" . $folder)) {
        $count++; ?>
        <ul class="index-section" id="<?php echo $count ?>"> <?php echo $folder; ?></ul>
        <?php
        $files = scandir($dir . "/" . $folder);
        // print_r($files);
        // var_dump($files);
        // printf($value);

        foreach ($files as $key => $file) {
          if (!in_array($file, array(".", ".."))) {
            //printf($value2); 
            $filePath = $dir . "/" . $folder . "/" . $file;

            // ! Récupération du Titre du fichier html depuis le DOM.
            $html = new DOMDocument();
            @$html->loadHtmlFile($filePath);
            // $html->loadHtmlFile($filePath); // KO

            //var_dump($fileTitle);
            // $xpath = new DOMXPath($html);
            // $elements = $xpath->query("/html/head/title");
            // var_dump($elements);
            $fileTitle = $html->getElementsByTagName('title')->item(0)->textContent;
            // var_dump($html->getElementsByTagName('title')->item(0));
        ?>

            <li class="index-item">
              <a href=" <?php echo $filePath ?> " target="_blank"><?php echo $fileTitle ?></a>
              <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/RctaFustg5w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
            </li>
  <?php
          }
        }
      }
    }
  }
  ?>
</body>

</html>