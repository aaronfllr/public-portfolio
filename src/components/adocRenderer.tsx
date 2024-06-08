"use server";
import { useEffect, useState } from 'react';
import Asciidoctor from 'asciidoctor';
import { promises as fs } from 'fs';

const asciidoctor = Asciidoctor();

export async function AdocRenderer({ filePath }: { filePath: string }) {
    const fetchData = async () => {

      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const htmlContent = asciidoctor.convert(fileContent);
        return htmlContent.toString();
      } catch (error) {
        console.error('Error reading the file:', error);
      }
    };

    let content = await fetchData();
    if (content == null) {
      content = 'Error loading the file';
    }
    
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};