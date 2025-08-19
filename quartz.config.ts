name: Build & Deploy main site + Quartz /magnetobiologia
on:
  push:
    branches: [main]
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: "pages", cancel-in-progress: false }
jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
      - name: Checkout Quartz repo
        uses: actions/checkout@v4
        with:
          repository: kierprev/magnetobiologia
          ref: v4
          path: quartz
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - name: Build Quartz
        run: |
          cd quartz
          npm ci
          npx quartz build
          cd ..
      - name: Copy into /magnetobiologia
        run: |
          rm -rf magnetobiologia
          mkdir -p magnetobiologia
          cp -r quartz/public/* magnetobiologia/
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with: { path: . }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
