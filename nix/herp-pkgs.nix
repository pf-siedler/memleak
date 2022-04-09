let
  sources = import ./sources.nix {};
  pkgs = import ./pkgs.nix {};
  herp-nixpkgs = import sources.herp-nixpkgs { inherit pkgs; };
in
  herp-nixpkgs
