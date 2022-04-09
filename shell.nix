let
  pkgs = import ./nix/pkgs.nix {};
  language = import ./nix/language.nix;
in
  with pkgs;
  mkShell {
    buildInputs =
      (with language.js; [ pkgman runtime ] );
  }
