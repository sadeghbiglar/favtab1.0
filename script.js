fetch('https://vr1.s3.ir-thr-at1.arvanstorage.ir/links.xml')
  .then(response => response.text())
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const groups = xmlDoc.getElementsByTagName('group');

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const links = group.getElementsByTagName('link');
      const title = group.getAttribute('title');

      const linksDiv = document.getElementById(`group${i+1}`);
      for (let j = 0; j < links.length; j++) {
        const link = links[j];
        const url = link.getAttribute('url');
        const text = link.textContent;
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.textContent = text;
        linkElement.target="_blank";
        linksDiv.appendChild(linkElement);
      }

      const header = linksDiv.previousElementSibling;
      header.textContent = title;
    }
  });
