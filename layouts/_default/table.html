{{ define "main" }}
  {{- $type := default "overview" .Params.type -}}
  {{- $column_text := default "Difficulty" .Params.column_text -}}
  {{- $column_param := default "difficulty" .Params.column_param -}}

  {{- $current := .Page.RelPermalink -}}
  {{- $len := len (split $current "/") -}}
  {{- $pages := (where .Site.Pages "Section" .Page.Section).ByParam "updated" -}}

  <div class="DocsPage">
    {{- partial "topbar.mobile" . -}}
    {{- partial "sidebar.nav" . -}}

    <div class="DocsToolbar">
      {{- partial "topbar.search" . -}}
      {{- partial "topbar.tools" . -}}
    </div>

    <main class="DocsBody">
      <div id="docs-content" data-reach-skip-nav-content></div>

      <div class="DocsContent" page-type="{{ $type }}">
        <article class="DocsMarkdown">
          {{- .Content -}}

          <div class="DocsTutorials">
            <div class="DocsTutorials--header">
              <div class="DocsTutorials--row">
                <div class="DocsTutorials--column" data-column="name">
                  <span class="DocsTutorials--column-text">Name</span>
                </div>

                <div class="DocsTutorials--column" data-column="updated">
                  <span class="DocsTutorials--column-text">Updated</span>
                </div>

                <div class="DocsTutorials--column" data-column="type">
                  <span class="DocsTutorials--column-text">{{ $column_text }}</span>
                </div>

                <div class="DocsTutorials--column" data-column="length">
                  <span class="DocsTutorials--column-text">Length</span>
                </div>
              </div>
            </div>

            <div class="DocsTutorials--body">
              {{- $max_words := 0 -}}
              {{- range $pages -}}
                {{- $max_words = math.Max $max_words .WordCount -}}
              {{- end -}}

              {{- range $pages.Reverse -}}
                {{- $x := .RelPermalink -}}
                {{- $self := eq $x $current -}}
                {{- $delta := sub (len (split $x "/")) $len -}}
                {{- if and (not $self) (hasPrefix $x $current) (lt $delta 2) -}}
                  <div class="DocsTutorials--row{{ if false }} DocsTutorials--row-is-new{{ end }}">
                    <div class="DocsTutorials--column" data-column="name">
                      {{- $href := or .Params.redirect .RelPermalink -}}
                      {{- .Page.RenderString (printf "[%s](%s)" .Title $href) -}}
                    </div>

                    <div class="DocsTutorials--column" data-column="updated">
                      {{- with .Params.updated -}}
                        {{- partial "datetime" (time .) -}}
                      {{- end -}}
                    </div>

                    <div class="DocsTutorials--column" data-column="type">
                      {{- index .Params $column_param -}}
                    </div>

                    <div class="DocsTutorials--column" data-column="length">
                      <div class="DocsTutorials--length-bar">
                        {{- $percent := (mul (div .WordCount $max_words) 100) -}}
                        <div class="DocsTutorials--length-bar-inner" style="width: {{ $percent }}%"></div>
                      </div>
                    </div>
                  </div>
                {{- end -}}
              {{- end -}}
            </div>
          </div>

        </article>
      </div>
    </main>

    {{ partial "footer" . }}
  </div>
{{ end }}